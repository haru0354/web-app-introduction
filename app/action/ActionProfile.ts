"use server"

import prisma from "../lib/prisma";
import { z } from "zod";

type FormProfileState = {
  message?: string | null;
  errors?: {
    selfIntroduction?: string[] | undefined;
    occupation?: string[] | undefined;
    skill?: string[] | undefined;
    portfolio?: string[] | undefined;
    gitHub?: string[] | undefined;
    x?: string[] | undefined;
  };
};

const profileSchema = z.object({
  selfIntroduction: z.string().optional(),
  occupation: z.string().optional(),
  skill: z.string().optional(),
  portfolio: z.string().url({ message: "URL を入力してください" }).optional(),
  gitHub: z.string().url({ message: "URL を入力してください" }).optional(),
  x: z.string().url({ message: "URL を入力してください" }).optional(),
});

export const editProfile = async (
  state: FormProfileState,
  formData: FormData
) => {
  const selfIntroduction = formData.get("selfIntroduction") as string;
  const occupation = formData.get("occupation") as string;
  const skill = formData.get("skill") as string;
  const portfolio = formData.get("portfolio") as string;
  const gitHub = formData.get("gitHub") as string;
  const x = formData.get("x") as string;
  const userId = formData.get("userId") as string;

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
    return { message: "success" };
  } catch (error) {
    console.error("プロフィールの追加の際にエラーが発生しました。:", error);
    return { message: "プロフィールの追加の際にエラーが発生しました。" };
  }
};
