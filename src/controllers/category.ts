import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const prisma = new PrismaClient();
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: "asc" }, // Mengurutkan berdasarkan tanggal pembuatan
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories.",
    });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const prisma = new PrismaClient();
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
    res.status(500).json({
      success: false,
      message: "Failed to fetch category.",
    });
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

    const prisma = new PrismaClient();
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
    res.status(500).json({
      success: false,
      message: "Failed to update category.",
    });
  }
};