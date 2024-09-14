"use server";

import bcrypt from "bcrypt";
import prisma from "../lib/prisma";
import { z } from "zod";
import { getSessionUserId } from "../lib/sessionUserService";

type FormSignUpState = {
  message?: string | null;
  errors?: {
    email?: string[] | undefined;
    password?: string[] | undefined;
  };
};

const accountSchema = z.object({
  email: z.string().email("メールアドレスを入力してください"),
  password: z
    .string()
    .min(8, { message: "8文字以上で入力してください。" })
    .max(12, { message: "12文字以下で入力してください。" }),
});

export const signUp = async (state: FormSignUpState, formData: FormData) => {
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
      console.log("バリデーションエラー：", errors);
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

export const updateEmail = async (
  state: FormSignUpState,
  formData: FormData
) => {
  try {
    const userId = formData.get("userId") as string;
    const newEmail = formData.get("newEmail") as string;
    const password = formData.get("password") as string;

    const validatedFields = accountSchema.safeParse({
      email: newEmail,
      password,
    });

    if (!validatedFields.success) {
      const errors = {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "正しい形式でフォームを入力してください。",
      };
      console.log("バリデーションエラー：", errors);
      return errors;
    }

    const sessionUserId = await getSessionUserId();

    if (!sessionUserId) {
      throw new Error("セッションを取得できませんでした。");
    }

    if (sessionUserId !== userId) {
      throw new Error("セッションとフォームで送信されたIDが一致しません。");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("登録しているユーザーが見つかりません。");
    }

    const isPasswordValid = user.hashedPassword
      ? await bcrypt.compare(password, user.hashedPassword)
      : false;

    if (!isPasswordValid) {
      return { message: "パスワードが正しくありません。" };
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email: newEmail,
      },
    });

    return { message: "success" };
  } catch (error) {
    console.error("メールアドレスの変更中にエラーが発生しました:", error);
    return { message: "メールアドレスの変更中にエラーが発生しました" };
  }
};
