import { Request, Response, NextFunction, RequestHandler } from "express";
import { User } from "@prisma/client";
import {
  CreateUserRequest,
  LoginUserRequest,
  UpdateUserRequest,
} from "../models/user";
import { UserService } from "../services/user";
import { UserRequest } from "../types/user-request";

export default class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateUserRequest = req.body as CreateUserRequest;
      const response = await UserService.register(request);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: LoginUserRequest = req.body as LoginUserRequest;
      const response = await UserService.login(request);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: UpdateUserRequest = req.body as UpdateUserRequest;
      const response = await UserService.update(req.user!, request);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async logout(req: UserRequest, res: Response, next: NextFunction) {
    try {
      await UserService.logout(req.user!);
      res.status(200).json({
        data: "OK",
      });
    } catch (e) {
      next(e);
    }
  }

  static updateProfile: RequestHandler = async (req, res, next) => {
    try {
      if (!req.user?.userId) {
        res.status(401).json({ error: "User not authenticated" });
        return;
      }

      const { fullname, phone, address, genderId } = req.body;
      const response = await UserService.updateProfile(
        req.user.userId,
        fullname,
        phone,
        address,
        genderId
      );
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  };

  static async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user?.userId) {
        res.status(401).json({ error: "User not authenticated" });
        return;
      }

      const profile = await UserService.getProfile(req.user.userId);
      res.status(200).json({
        data: profile,
      });
    } catch (e) {
      next(e);
    }
  }
}
