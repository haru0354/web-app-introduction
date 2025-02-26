"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getSessionUserId } from "../lib/sessionUserService";
import prisma from "../lib/prisma";

import type { ProfileFormState } from "@/types/formStateTypes";

const profileSchema = z.object({
  selfIntroduction: z.string().optional(),
  occupation: z.string().optional(),
  skill: z.string().optional(),

  // 下記3つは「.url」だと空白はエラーになるのでrefineで値がある時に正規表現でチェック
  portfolio: z
    .string()
    .optional()
    .refine((val) => !val || /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(val), {
      message: "URL を入力してください",
    }),
  gitHub: z
    .string()
    .optional()
    .refine((val) => !val || /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(val), {
      message: "URL を入力してください",
    }),
  x: z
    .string()
    .optional()
    .refine((val) => !val || /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(val), {
      message: "URL を入力してください",
    }),
});

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
  const userId = formData.get("userId") as string;
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

  if (user.id !== userId) {
    throw new Error(
      "登録しているユーザーのIDとフォームから送信されたユーザーのIDが一致しません。"
    );
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
        id: userId,
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

    console.log("プロフィールの編集に成功しました。");
  } catch (error) {
    console.error("プロフィールの追加の際にエラーが発生しました。:", error);
    return { message: "プロフィールの追加の際にエラーが発生しました。" };
  }
  revalidatePath("/dashboard");
  return { message: "success" };
};
