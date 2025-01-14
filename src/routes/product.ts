// src/routes/productRoutes.ts
import express from "express";
import { getProducts, addProduct, editProduct, deleteProduct, getProductDetail } from "../controllers/product";
import { authMiddleware } from "../middlewares/auth";
import { upload } from "../middlewares/multer";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductDetail);
router.post("/", authMiddleware, upload.single("image"), addProduct); // Only admin
router.put("/:id", authMiddleware, upload.single("image"), editProduct); // Only admin
router.delete("/:id", authMiddleware, deleteProduct); // Only admin

export default router;
