// src/routes/cartRoutes.ts
import express from "express";
import { addItemToCart, getCart } from "../controllers/cartController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, getCart);
router.post("/add", authMiddleware, addItemToCart);

export default router;
