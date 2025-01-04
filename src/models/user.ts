import { User } from "@prisma/client";

export interface CreateUserRequest {
  email: string;
  password: string;
  roleId: number;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  email: string;
  roleId: number;
  token?: string;
}

export interface UpdateUserRequest {
  email?: string;
  password?: string;
  roleId?: number;
}

export function toUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    email: user.email,
    roleId: user.roleId
  };
}
