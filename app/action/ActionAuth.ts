"use server";

import bcrypt from "bcrypt";
import prisma from "../lib/prisma";
import { z } from "zod";

type FormAuthState = {
  message?: string | null;
  errors?: {
    email?: string[] | undefined;
    password?: string[] | undefined;
  };
};

const accountSchema = z.object({
  email: z.string().email("メールアドレスを入力してください"),
  password: z.string().min(8, { message: "8文字以上で入力してください。" }).max(12, { message: "12文字以下で入力してください。" }),
});

export const signUp = async (state: FormAuthState, formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const validatedFields = accountSchema.safeParse({
      email,
      password,
    });

    if (!validatedFields.success) {
      const errors = {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "正しい形式でフォームを入力してください。",
      };
      console.log("バリデーションエラー：",errors);
      return errors;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        email,
        hashedPassword,
        profile: {
          selfIntroduction: "",
          occupation: "",
          skill: "",
          portfolio: "",
          gitHub: "",
          x: "",
        },
      },
    });

    return { message: "アカウントの登録に成功しました。" };
  } catch (error) {
    console.error("アカウントの登録中にエラーが発生しました:", error);
    return { message: "アカウントの登録中にエラーが発生しました" };
  }
};
