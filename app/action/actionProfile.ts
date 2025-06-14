"use server";

import { revalidatePath } from "next/cache";

import { getSessionUserId } from "../lib/service/sessionUserService";
import prisma from "../lib/prisma";

import { profileSchema } from "../schemas/profileSchema";
import type { ProfileFormState } from "@/types/formStateTypes";

export const editProfile = async (
  state: ProfileFormState,
  formData: FormData
) => {
  const selfIntroduction = formData.get("selfIntroduction") as string;
  const occupation = formData.get("occupation") as string;
  const skill = formData.get("skill") as string;
  const portfolio = formData.get("portfolio") as string;
  const gitHub = formData.get("gitHub") as string;
  const x = formData.get("x") as string;
  const sessionUserId = await getSessionUserId();

  if (!sessionUserId) {
    console.error("セッションの取得に失敗しました。");
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

  const validatedFields = profileSchema.safeParse({
    selfIntroduction,
    occupation,
    skill,
    portfolio,
    gitHub,
    x,
  });

  if (!validatedFields.success) {
    const errors = {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "正しい形式でフォームを入力してください。",
    };
    console.log("バリデーションエラー：", errors);
    return errors;
  }

  try {
    await prisma.user.update({
      where: {
        id: sessionUserId,
      },
      data: {
        profile: {
          selfIntroduction,
          occupation,
          skill,
          portfolio,
          gitHub,
          x,
        },
      },
    });
    
    revalidatePath("/dashboard");
    return { message: "success" };
  } catch (error) {
    console.error("プロフィールの追加の際にエラーが発生しました。:", error);
    return { message: "プロフィールの追加の際にエラーが発生しました。" };
  }
};
