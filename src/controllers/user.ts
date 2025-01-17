import { Request, Response, NextFunction, RequestHandler } from "express";
import { UserService } from "../services/user";

export default class UserController {
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
        +genderId
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
      res.status(200).json(profile);
    } catch (e) {
      next(e);
    }
  }
}
