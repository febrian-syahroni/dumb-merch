import express from "express";
import UserController from "../controllers/user";
import { authMiddleware } from "../middlewares/auth";
import { upload } from "../middlewares/multer";

const userRouter = express.Router();

userRouter.use(authMiddleware);
userRouter.get("/profile", UserController.getProfile);
userRouter.put("/update", upload.single('image'), UserController.updateProfile);

export { userRouter };
