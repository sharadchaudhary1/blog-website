
import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid().optional(), 
  name: z
    .string().min(1, "Name is required")
    .max(255, "Name must be at most 255 characters long"),
  email: z
    .string().email("Invalid email address")
    .max(255, "Email must be at most 255 characters long"),
  image: z
    .string().url("Invalid image URL")
    .max(500, "Image URL must be at most 500 characters long")
    .optional()
    .nullable(),
  createdAt: z.date().optional(), 
});

export type UserSchema = z.infer<typeof userSchema>;
