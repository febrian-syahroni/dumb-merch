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

export const registerUserService = async (data: any) => {
  const { email, password } = registerSchema.parse(data);
  const roleId = data.roleId || 2;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      roleId
    }
  });

  return user;
};

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export const loginUserService = async (data: any) => {
  const { email, password } = loginSchema.parse(data);
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error("Invalid credentials");

  const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '24h' });
  
  // Set cookie with token
  return { token }; // Kembalikan token untuk digunakan di frontend
};
