// src/routes/productRoutes.ts
import express from "express";
import { getProducts, addProduct } from "../controllers/product";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

router.get("/", getProducts);
router.post("/", authMiddleware, addProduct); // Only admin

export default router;
