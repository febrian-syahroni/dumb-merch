import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTransaction: RequestHandler = async (req, res) => {
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: req.user!.userId },
      include: { items: { include: { product: true } } }
    });

    if (!cart || !cart.items.length) {
      res.status(400).json({ error: "Cart is empty" });
      return;
    }

    const total = cart.items.reduce((sum, item) => 
      sum + (item.quantity * item.product.price), 0);

    const transaction = await prisma.transaction.create({
      data: {
        userId: req.user!.userId,
        total,
        statusId: 1, // Pending
        items: {
          create: cart.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            subtotal: item.quantity * item.product.price
          }))
        }
      },
      include: { items: { include: { product: true } } }
    });

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id }
    });

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: "Failed to create transaction" });
  }
};

export const getUserTransactions: RequestHandler = async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId: req.user!.userId },
      include: { items: { include: { product: true } } }
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
}; 