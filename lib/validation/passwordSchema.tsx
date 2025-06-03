import z from "zod";
import { passwordRegex } from "./signUpSchema";

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});
export type TforgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    new_password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        passwordRegex,
        "Password must include uppercase, lowercase, number, and special character"
      ),
    confirm_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type TresetPasswordSchema = z.infer<typeof resetPasswordSchema>;
