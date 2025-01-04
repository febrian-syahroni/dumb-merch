// src/middlewares/authMiddleware.ts
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

export const authMiddleware: RequestHandler = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ error: "Access denied" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as User;
    req.user = decoded;
    console.log("User decoded:", req.user);
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};
