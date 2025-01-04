// src/controllers/authController.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET!;

export const registerUser = async (req, res) => {
  // Implement registration logic with validation
};

export const loginUser = async (req, res) => {
  // Implement login logic with validation
};
