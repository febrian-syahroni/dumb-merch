import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts: RequestHandler = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const addProduct: RequestHandler = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId } = req.body;
    const product = await prisma.product.create({
      data: { name, description, price, stock, categoryId }
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: "Failed to create product" });
  }
}; 