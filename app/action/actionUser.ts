"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

import { getSessionUserId } from "../lib/service/sessionUserService";
import prisma from "../lib/prisma";

import {
  accountSchema,
  deleteAccountSchema,
  updateEmailSchema,
  updatePasswordSchema,
} from "../schemas/userSchemas";
import type {
  DeleteAccountFormState,
  EmailFormState,
  SignUpFormState,
  UpdatePasswordFormState,
} from "@/types/formStateTypes";

export const signUp = async (state: SignUpFormState, formData: FormData) => {
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

  try {
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
  } catch (error) {
    console.error("アカウントの登録中にエラーが発生しました:", error);
    return { message: "アカウントの登録中にエラーが発生しました" };
  }
  
  redirect("/dashboard");
};

export const updateEmail = async (
  state: EmailFormState,
  formData: FormData
) => {
  const email = formData.get("email") as string;
  const newEmail = formData.get("newEmail") as string;
  const password = formData.get("password") as string;

  const validatedFields = updateEmailSchema.safeParse({
    email,
    newEmail,
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
    console.error("メールアドレス変更中にセッションの取得に失敗しました。");
    return { message: "再度ログイン後にお試しください。（認証エラー）" };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: sessionUserId,
    },
  });

  if (!user) {
    console.error("ユーザーが見つかりませんでした。");
    return {
      message:
        "ユーザーデータが見つかりませんでした。再度ログイン後にお試しください。",
    };
  }

  const isPasswordValid = user.hashedPassword
    ? await bcrypt.compare(password, user.hashedPassword)
    : false;

  if (!isPasswordValid) {
    return { message: "パスワードが正しくありません。" };
  }

  try {
    await prisma.user.update({
      where: {
        id: sessionUserId,
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
  state: UpdatePasswordFormState,
  formData: FormData
) => {
  const password = formData.get("password") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmationPassword = formData.get("confirmationPassword") as string;

  const validatedFields = updatePasswordSchema.safeParse({
    password,
    newPassword,
    confirmationPassword,
  });

  if (!validatedFields.success) {
    const errors = {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "正しい形式でフォームを入力してください。",
    };
    console.log("バリデーションエラー：", errors);
    return errors;
  }

  if (newPassword !== confirmationPassword) {
    console.error(
      "「新しいパスワード」「新しいパスワード（確認用）」が一致しません。"
    );
    return {
      message:
        "「新しいパスワード」「新しいパスワード（確認用）」が一致しません。",
    };
  }

  const sessionUserId = await getSessionUserId();

  if (!sessionUserId) {
    console.error("メールアドレス変更中にセッションの取得に失敗しました。");
    return { message: "再度ログイン後にお試しください。（認証エラー）" };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: sessionUserId,
    },
  });

  if (!user) {
    console.error("ユーザーが見つかりませんでした。");
    return {
      message:
        "ユーザーデータが見つかりませんでした。再度ログイン後にお試しください。",
    };
  }

  const isPasswordValid = user.hashedPassword
    ? await bcrypt.compare(password, user.hashedPassword)
    : false;

  if (!isPasswordValid) {
    return { message: "登録中のパスワードが正しくありません。" };
  }

  const newHashedPassword = await bcrypt.hash(newPassword, 12);

  try {
    await prisma.user.update({
      where: {
        id: sessionUserId,
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
  state: DeleteAccountFormState,
  formData: FormData
) => {
  const password = formData.get("password") as string;
  const confirmationPassword = formData.get("confirmationPassword") as string;

  const validatedFields = deleteAccountSchema.safeParse({
    password,
    confirmationPassword,
  });

  if (!validatedFields.success) {
    const errors = {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "正しい形式でフォームを入力してください。",
    };
    console.log("バリデーションエラー：", errors);
    return errors;
  }

  if (password !== confirmationPassword) {
    console.error("「パスワード」「パスワード（確認用）」が一致しません。");
    return {
      message: "「パスワード」「パスワード（確認用）」が一致しません。",
    };
  }

  const sessionUserId = await getSessionUserId();

  if (!sessionUserId) {
    console.error("メールアドレス変更中にセッションの取得に失敗しました。");
    return { message: "再度ログイン後にお試しください。（認証エラー）" };
  }

  const user = await prisma.user.findUnique({
    where: {
      id: sessionUserId,
    },
  });

  if (!user) {
    console.error("ユーザーが見つかりませんでした。");
    return {
      message:
        "ユーザーデータが見つかりませんでした。再度ログイン後にお試しください。",
    };
  }

  const isPasswordValid = user.hashedPassword
    ? await bcrypt.compare(password, user.hashedPassword)
    : false;

  if (!isPasswordValid) {
    console.error("パスワードが正しくありません。");
    return { message: "パスワードが正しくありません。" };
  }

  try {
    await prisma.user.delete({
      where: {
        id: sessionUserId,
      },
    });

    return { message: "success" };
  } catch (error) {
    console.error("アカウントの削除中にエラーが発生しました:", error);
    return { message: "アカウントの削除中にエラーが発生しました" };
  }
};
