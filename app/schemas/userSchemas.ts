import { z } from "zod";

export const accountSchema = z.object({
  email: z.string().email("メールアドレスを入力してください"),
  password: z
    .string()
    .min(8, { message: "8文字以上で入力してください。" })
    .max(12, { message: "12文字以下で入力してください。" }),
});

export const updateEmailSchema = z.object({
  email: z.string().email("メールアドレスを入力してください"),
  newEmail: z.string().email("メールアドレスを入力してください"),
  password: z
    .string()
    .min(8, { message: "8文字以上で入力してください。" })
    .max(12, { message: "12文字以下で入力してください。" }),
});

export const updatePasswordSchema = z.object({
  password: z.string().min(8, { message: "8文字以上で入力してください。" }),
  newPassword: z
    .string()
    .min(8, { message: "8文字以上で入力してください。" })
    .max(12, { message: "12文字以下で入力してください。" }),
  confirmationPassword: z
    .string()
    .min(8, { message: "8文字以上で入力してください。" })
    .max(12, { message: "12文字以下で入力してください。" }),
});

export const deleteAccountSchema = z.object({
  password: z
    .string()
    .min(8, { message: "8文字以上で入力してください。" })
    .max(12, { message: "12文字以下で入力してください。" }),
  confirmationPassword: z
    .string()
    .min(8, { message: "8文字以上で入力してください。" })
    .max(12, { message: "12文字以下で入力してください。" }),
});
