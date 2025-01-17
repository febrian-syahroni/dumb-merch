import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

// Create a single PrismaClient instance and reuse it
const prisma = new PrismaClient();

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: "asc" }, // Mengurutkan berdasarkan tanggal pembuatan
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    // Check if it's a Prisma error
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: "Database error: " + error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to fetch categories.",
      });
    }
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });

    if (!category) {
      res.status(404).json({
        success: false,
        message: "Category not found.",
      });
      return
    }

    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    // Check if it's a Prisma error
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: "Database error: " + error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to fetch category.",
      });
    }
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body; // Nama kategori dari body permintaan

    // Validasi input
    if (!name) {
      res.status(400).json({
        success: false,
        message: "Category name is required.",
      });
      return;
    }

    const newCategory = await prisma.category.create({
      data: { name },
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully.",
      data: newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    // Check if it's a Prisma error
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: "Database error: " + error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to create category.",
      });
    }
  }
};

export const editCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // ID kategori dari parameter URL
    const { name } = req.body; // Data kategori yang diperbarui dari body permintaan

    if (!name) {
      res.status(400).json({
        success: false,
        message: "Category name is required.",
      });
      return
    }

    const updatedCategory = await prisma.category.update({
      where: { id: Number(id) },
      data: { name },
    });

    res.status(200).json({
      success: true,
      message: "Category updated successfully.",
      data: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    // Check if it's a Prisma error
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: "Database error: " + error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to update category.",
      });
    }
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // ID kategori dari parameter URL

    // Pastikan ID valid
    if (!id) {
      res.status(400).json({
        success: false,
        message: "Category ID is required.",
      });
      return;
    }

    // Cek apakah kategori ada
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });

    if (!category) {
      res.status(404).json({
        success: false,
        message: "Category not found.",
      });
      return;
    }

    // Hapus kategori
    await prisma.category.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    // Check if it's a Prisma error
    if (error instanceof Error) {
      res.status(500).json({
        success: false,
        message: "Database error: " + error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to delete category.",
      });
    }
  }
};
