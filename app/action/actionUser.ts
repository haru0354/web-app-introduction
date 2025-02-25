"use server";

import { z } from "zod";
import bcrypt from "bcrypt";

import { getSessionUserId } from "../lib/sessionUserService";
import prisma from "../lib/prisma";

type FormSignUpState = {
  message?: string | null;
  errors?: {
    email?: string[] | undefined;
    password?: string[] | undefined;
  };
};

type FormUpdatePasswordState = {
  message?: string | null;
  errors?: {
    existingPassword?: string[] | undefined;
    newPasswordOne?: string[] | undefined;
    newPasswordTwo?: string[] | undefined;
  };
};

type deleteAccountState = {
  message?: string | null;
  errors?: {
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

const updatePasswordSchema = z.object({
  existingPassword: z
    .string()
    .min(8, { message: "8文字以上で入力してください。" }),
  newPasswordOne: z
    .string()
    .min(8, { message: "8文字以上で入力してください。" })
    .max(12, { message: "12文字以下で入力してください。" }),
  newPasswordTwo: z
    .string()
    .min(8, { message: "8文字以上で入力してください。" })
    .max(12, { message: "12文字以下で入力してください。" }),
});

const deleteAccountSchema = z.object({
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
      throw new Error(
        "セッションIDが一致しない、もしくは無効なセッションです。"
      );
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

export const updatePassword = async (
  state: FormUpdatePasswordState,
  formData: FormData
) => {
  try {
    const userId = formData.get("userId") as string;
    const existingPassword = formData.get("existingPassword") as string;
    const newPasswordOne = formData.get("newPasswordOne") as string;
    const newPasswordTwo = formData.get("newPasswordTwo") as string;

    const validatedFields = updatePasswordSchema.safeParse({
      existingPassword,
      newPasswordOne,
      newPasswordTwo,
    });

    if (!validatedFields.success) {
      const errors = {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "正しい形式でフォームを入力してください。",
      };
      console.log("バリデーションエラー：", errors);
      return errors;
    }

    if (newPasswordOne !== newPasswordTwo) {
      return { message: "入力した「新しいパスワード」が同じ値ではありません" };
    }

    const sessionUserId = await getSessionUserId();

    if (!sessionUserId) {
      throw new Error("セッションIDが取得できませんでした。");
    }

    if (sessionUserId !== userId) {
      throw new Error(
        "セッションIDが一致しない、もしくは無効なセッションです。"
      );
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
      ? await bcrypt.compare(existingPassword, user.hashedPassword)
      : false;

    if (!isPasswordValid) {
      return { message: "登録中のパスワードが正しくありません。" };
    }

    const newHashedPassword = await bcrypt.hash(newPasswordOne, 12);

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedPassword: newHashedPassword,
      },
    });

    return { message: "success" };
  } catch (error) {
    console.error("パスワードの変更中にエラーが発生しました:", error);
    return { message: "パスワードの変更中にエラーが発生しました" };
  }
};

export const deleteAccount = async (
  state: deleteAccountState,
  formData: FormData
) => {
  try {
    const userId = formData.get("userId") as string;
    const password = formData.get("password") as string;

    const validatedFields = deleteAccountSchema.safeParse({
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
      throw new Error("セッションIDが取得できませんでした。");
    }

    if (sessionUserId !== userId) {
      throw new Error(
        "セッションIDが一致しない、もしくは無効なセッションです。"
      );
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
      return { message: "登録中のパスワードが正しくありません。" };
    }

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return { message: "success" };
  } catch (error) {
    console.error("アカウントの削除中にエラーが発生しました:", error);
    return { message: "アカウントの削除中にエラーが発生しました" };
  }
};
