// src/routes/transactionRoutes.ts
import express from "express";
import {
  createTransaction,
  getUserTransactions,
} from "../controllers/transactionController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createTransaction);
router.get("/", authMiddleware, getUserTransactions);

export default router;
