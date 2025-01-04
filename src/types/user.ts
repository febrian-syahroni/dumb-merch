import { z } from "zod";
import { loginSchema } from "../validations/user";

export type LoginData = z.infer<typeof loginSchema>;
