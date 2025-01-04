// src/routes/authRoutes.ts
import express, { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth";

const router: Router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
