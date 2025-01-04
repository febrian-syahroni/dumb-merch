// src/routes/productRoutes.ts
import express from "express";
import { getProducts, addProduct } from "../controllers/productController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", getProducts);
router.post("/", authMiddleware, addProduct); // Only admin

export default router;
