import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllGenders = async (req: Request, res: Response) => {
  try {
    const genders = await prisma.gender.findMany();
    res.status(200).json(genders);
    return
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
    return
  }
};