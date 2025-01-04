// src/routes/transactionRoutes.ts
import express from "express";
import {
  createTransaction,
  getUserTransactions,
} from "../controllers/transaction";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

router.post("/", authMiddleware, createTransaction);
router.get("/", authMiddleware, getUserTransactions);

export default router;
