// import { v4 as uuid } from "uuid";
import { Validation } from "../validations";
import { UserValidation } from "../validations/user";
import { ResponseError } from "../error/response-error";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { prismaClient } from "../prisma";
import {
  CreateUserRequest,
  LoginUserRequest,
  toUserResponse,
  UpdateUserRequest,
  UserResponse,
} from "../models/user";

export class UserService {
  static async register(request: CreateUserRequest): Promise<UserResponse> {
    const registerRequest = Validation.validate(
      UserValidation.REGISTER,
      request
    );

    const totalUserWithSameEmail = await prismaClient.user.count({
      where: {
        email: registerRequest.email,
      },
    });

    if (totalUserWithSameEmail != 0) {
      throw new ResponseError(400, "Email already exists");
    }

    registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

    const user = await prismaClient.user.create({
      data: {
        email: registerRequest.email,
        password: registerRequest.password,
        roleId: registerRequest.roleId
      },
    });

    return toUserResponse(user);
  }

  static async login(request: LoginUserRequest): Promise<UserResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, request);

    let user = await prismaClient.user.findUnique({
      where: {
        email: loginRequest.email,
      },
    });

    if (!user) {
      throw new ResponseError(401, "Username or password is wrong");
    }

    const isPasswordValid = await bcrypt.compare(
      loginRequest.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new ResponseError(401, "Username or password is wrong");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        password: user.password,
        roleId: user.roleId,
        token: user.token,
        createdAt: user.createdAt
      },
      process.env.JWT_SECRET || "jifioqahdiwaio!jdoi2123k1",
      {
        expiresIn: "1d",
      }
    );

    const response = toUserResponse(user);
    response.token = token;
    return response;
  }

  static async get(user: User): Promise<UserResponse> {
    return toUserResponse(user);
  }

  static async update(user: User, request: UpdateUserRequest): Promise<UserResponse> {
    const updateRequest = Validation.validate(UserValidation.UPDATE, request);

    const result = await prismaClient.user.update({
      where: { id: user.id },
      data: updateRequest
    });

    return toUserResponse(result);
  }

  static async logout(user: User): Promise<UserResponse> {
    return toUserResponse(user);
  }

  static async updateProfile(userId: number, fullname: string, phone: number, address: string, genderId: number) {
    const profile = await prismaClient.profile.upsert({
      where: { userId },
      create: {
        fullname,
        phone,
        address,
        genderId,
        userId
      },
      update: {
        fullname,
        phone,
        address,
        genderId
      }
    });

    return profile;
  }

  static async getProfile(userId: number) {
    const profile = await prismaClient.profile.findUnique({
      where: { userId },
      include: { gender: true }
    });
    
    return profile;
  }
}
