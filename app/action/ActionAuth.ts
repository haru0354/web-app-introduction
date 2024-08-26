"use server";

import bcrypt from "bcrypt";
import prisma from "../lib/prisma";

export const signUp = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
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

    console.log("ユーザーの登録に成功しました。");
    return newUser;
  } catch (error) {
    console.error("ユーザーの登録中にエラーが発生しました。:", error);
    return null;
  }
};
