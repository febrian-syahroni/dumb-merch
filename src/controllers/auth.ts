import { RequestHandler } from "express";
import { registerUserService, loginUserService } from "../services/auth";

export const registerUser: RequestHandler = async (req, res) => {
  try {
    const user = await registerUserService(req.body);
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        email: user.email,
        roleId: user.roleId,
        profile: user.profile ? {
          id: user.profile.id,
          fullname: user.profile.fullname
        } : null
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};

export const loginUser: RequestHandler = async (req, res) => {
  try {
    const { token, roleId } = await loginUserService(req.body);
    res.json({ token, roleId });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: "An unknown error occurred" });
    }
  }
};
