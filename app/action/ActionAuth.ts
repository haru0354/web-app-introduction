"use server";

import bcrypt from "bcrypt";
import prisma from "../lib/prisma";

type FormAuthState = {
  message?: string | null;
  errors?: {
    email?: string[] | undefined;
    password?: string[] | undefined;
  };
};

export const signUp = async (state: FormAuthState, formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

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
