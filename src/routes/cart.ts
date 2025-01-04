// src/routes/cartRoutes.ts
import express from "express";
import { addItemToCart, getCart } from "../controllers/cart";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

router.get("/", authMiddleware, getCart);
router.post("/add", authMiddleware, addItemToCart);

export default router;
