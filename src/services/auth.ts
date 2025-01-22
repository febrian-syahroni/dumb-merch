import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET!;

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1)
});

export const registerUserService = async (data: any) => {
  const { email, password, name } = registerSchema.parse(data);
  const roleId = data.roleId || 2;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      roleId,
      profile: {
        create: {
          fullname: name,
          phone: "",
          address: "",
          genderId: 1, // Default gender ID
        }
      }
    },
    include: {
      profile: true
    }
  });

  return user;
};

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const loginUserService = async (body: any) => {
  const { email, password } = body;
  const user = await prisma.user.findUnique({ where: { email } });
  
  if (!user) throw new Error("Invalid credentials");
  
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error("Invalid credentials");
  
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
  
  return { token, roleId: user.roleId };
};
