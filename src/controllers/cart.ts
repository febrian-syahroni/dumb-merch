import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCart: RequestHandler = async (req, res) => {
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: req.user!.userId },
      include: { items: { include: { product: true } } }
    });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

export const addItemToCart: RequestHandler = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await prisma.cart.upsert({
      where: { userId: req.user!.userId },
      create: { userId: req.user!.userId, items: { create: { productId, quantity } } },
      update: { items: { create: { productId, quantity } } },
      include: { items: { include: { product: true } } }
    });
    res.json(cart);
  } catch (error) {
    res.status(400).json({ error: "Failed to add item to cart" });
  }
}; 