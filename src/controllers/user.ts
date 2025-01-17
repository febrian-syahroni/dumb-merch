import { Request, Response, NextFunction, RequestHandler } from "express";
import { UserService } from "../services/user";
import { Readable } from "stream";
import cloudinary from "../middlewares/cloudinary";

export default class UserController {
  static updateProfile: RequestHandler = async (req, res, next) => {
    try {
      if (!req.user?.userId) {
        res.status(401).json({ error: "User not authenticated" });
        return;
      }

      const { fullname, phone, address, genderId } = req.body;
      let imageUrl = undefined;

      if (req.file) {
        // Convert buffer to stream
        const stream = Readable.from(req.file.buffer);

        // Upload to cloudinary using stream
        const uploadPromise = new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "dumb-merch/profiles",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );

          stream.pipe(uploadStream);
        });

        const result = await uploadPromise as any;
        imageUrl = result.secure_url;
      }

      const response = await UserService.updateProfile(
        req.user.userId,
        fullname,
        phone,
        address,
        +genderId,
        imageUrl
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
