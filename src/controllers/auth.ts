// src/controllers/authController.ts
import { Request, Response, RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET!;

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  roleId: z.number()
});

export const registerUser: RequestHandler = async (req, res) => {
  try {
    const { email, password, roleId } = registerSchema.parse(req.body);
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        roleId
      }
    });

    res.status(201).json({ 
      message: "User registered successfully",
      user: {
        id: user.id,
        email: user.email,
        roleId: user.roleId
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export const loginUser: RequestHandler = async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '24h' });
    res.json({ token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};
