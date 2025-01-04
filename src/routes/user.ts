import express from "express";
import UserController from "../controllers/user";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();
router.put("/update", authMiddleware, UserController.updateProfile); // Route untuk Update informasi pengguna
router.get("/profile", authMiddleware, UserController.getProfile); // Route untuk mendapatkan detail profil pengguna

export default router;
