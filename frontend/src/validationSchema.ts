import { z } from "zod";

export const userSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    name: z.string().min(1, "Username is required"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    birthYear: z
      .number()
      .min(1900, "Birth year must be 1900 or later")
      .max(new Date().getFullYear(), "Birth year cannot be in the future"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
