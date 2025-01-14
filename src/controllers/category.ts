import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const prisma = new PrismaClient();
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: "asc" }, // Mengurutkan berdasarkan tanggal pembuatan
    });
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories.",
    });
  }
};
