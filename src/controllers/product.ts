import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import cloudinary from "../middlewares/cloudinary";

const prisma = new PrismaClient();

export const getProducts: RequestHandler = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const getProductDetail: RequestHandler = async (req, res) => {
  const { id } = req.params; // Mengambil ID produk dari URL

  const product = await prisma.product.findUnique({
    where: { id: parseInt(id, 10) },
  });

  if (!product) {
    res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
};


export const addProduct: RequestHandler = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId } = req.body;

    if (!req.file) {
      res.status(400).json({ error: "Image file is required" });
      return;
    }

    const uploadResult = await cloudinary.uploader.upload_stream(
      { folder: "products" },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          res.status(400).json({ error: "Upload failed" });
          return;
        }

        const product = await prisma.product.create({
          data: {
            name,
            description,
            price: parseFloat(price),
            stock: parseInt(stock, 10),
            categoryId: +categoryId,
            imageUrl: result?.secure_url,
          },
        });

        res.status(201).json(product);
      }
    );

    uploadResult.end(req.file.buffer);
  } catch (error) {
    res.status(400).json({ error: "Failed to create product" });
  }
};

export const editProduct: RequestHandler = async (req, res) => {
  const { id } = req.params; // ID produk ada di URL, bukan body

  const { name, description, price, stock, categoryId } = req.body;

  if (!id) {
    res.status(400).json({ error: "Product ID is required" });
    return;
  }

  const existingProduct = await prisma.product.findUnique({
    where: { id: parseInt(id, 10) },
  });

  if (!existingProduct) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  let updatedImageUrl = existingProduct.imageUrl;

  // Jika ada file baru, upload ke Cloudinary
  if (req.file && req.file.buffer) {
    const uploadResult = await new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result?.secure_url || "");
        }
      );
      uploadStream.end(req.file!.buffer);
    });

    updatedImageUrl = uploadResult;
  }

  const updatedProduct = await prisma.product.update({
    where: { id: parseInt(id, 10) },
    data: {
      name,
      description,
      price: price ? parseFloat(price) : existingProduct.price,
      stock: stock ? parseInt(stock, 10) : existingProduct.stock,
      categoryId: categoryId ? +categoryId : existingProduct.categoryId,
      imageUrl: updatedImageUrl,
    },
  });

  res.status(200).json(updatedProduct);
};


export const deleteProduct: RequestHandler = async (req, res) => {
  const { id } = req.params; // ID produk ada di URL

  if (!id) {
    res.status(400).json({ error: "Product ID is required" });
    return;
  }

  // Cari produk berdasarkan ID
  const existingProduct = await prisma.product.findUnique({
    where: { id: parseInt(id, 10) },
  });

  if (!existingProduct) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  // Menghapus produk dari database
  const deletedProduct = await prisma.product.delete({
    where: { id: parseInt(id, 10) },
  });

  // Menghapus gambar dari Cloudinary jika ada
  if (existingProduct.imageUrl) {
    const imagePublicId = existingProduct.imageUrl.split("/").pop()?.split(".")[0];
    await cloudinary.uploader.destroy(imagePublicId || "", (error) => {
      if (error) {
        console.error("Error deleting image from Cloudinary:", error);
      }
    });
  }

  res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
};
