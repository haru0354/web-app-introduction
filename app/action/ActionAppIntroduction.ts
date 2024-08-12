"use server";

import { redirect } from "next/navigation";
import prisma from "../lib/prisma";
import { z } from "zod";
import { FileSaveStorage } from "../components/lib/FileSaveStorage";

type FormState = {
  message?: string | null;
  errors?: {
    title?: string[] | undefined;
    summary?: string[] | undefined;
    url?: string[] | undefined;
    technology?: string[] | undefined;
    overview?: string[] | undefined;
    solution?: string[] | undefined;
    can?: string[] | undefined;
  };
};

const appIntroductionSchema = z.object({
  title: z.string().min(1, { message: "タイトルの入力は必須です" }),
  summary: z.string().min(1, { message: "アプリの種類の入力は必須です" }),
  url: z.string().url({ message: "URLを入力してください" }),
  technology: z.string().optional(),
  overview: z.string().min(1, { message: "詳細の入力は必須です" }),
  solution: z.string().min(1, { message: "解決できる課題の入力は必須です" }),
  can: z.array(
    z.string().min(1, { message: "最低でも1つ出来ることを記載が必要です" })
  ),
});

export const addAppIntroduction = async (
  state: FormState,
  formData: FormData
) => {
  const title = formData.get("title") as string;
  const summary = formData.get("summary") as string;
  const url = formData.get("url") as string;
  const technology = formData.get("technology") as string;
  const overview = formData.get("overview") as string;
  const solution = formData.get("solution") as string;
  const userId = formData.get("userId") as string;
  const image = formData.get("imageFile") as File;
  const imageALT = formData.get("imageALT") as string;

  const canArray = [];
  let canIndex = 0;
  while (true) {
    const value = formData.get(`can${canIndex}`);
    if (
      value === undefined ||
      value === null ||
      value === "" ||
      typeof value !== "string"
    )
      break;
    canArray.push(value);
    canIndex++;
  }

  const validatedFields = appIntroductionSchema.safeParse({
    title,
    summary,
    url,
    technology,
    overview,
    solution,
    can: canArray,
  });

  if (!validatedFields.success) {
    const errors = {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "バリデーションエラー",
    };
    console.log(errors);
    return errors;
  }
  
    const imageURL = await FileSaveStorage(image, userId);

  try {
    await prisma.appIntroduction.create({
      data: {
        title,
        summary,
        url,
        technology,
        overview,
        solution,
        can: canArray,
        images: [
          {
            imageURL,
            imageALT,
          },
        ],
        userId,
      },
    });

    console.log("アプリの追加に成功しました。");
  } catch (error) {
    console.error("アプリの追加の際にエラーが発生しました。:", error);
    return { message: "アプリの追加の際にエラーが発生しました。" };
  }
  redirect("/dashboard");
};

export const updateAppIntroduction = async (
  state: FormState,
  formData: FormData
) => {
  const title = formData.get("title") as string;
  const summary = formData.get("summary") as string;
  const url = formData.get("url") as string;
  const technology = formData.get("technology") as string;
  const overview = formData.get("overview") as string;
  const solution = formData.get("solution") as string;
  const appId = formData.get("appId") as string;

  const canArray = [];
  let canIndex = 0;
  while (true) {
    const value = formData.get(`can${canIndex}`);
    if (
      value === undefined ||
      value === null ||
      value === "" ||
      typeof value !== "string"
    )
      break;
    canArray.push(value);
    canIndex++;
  }

  const validatedFields = appIntroductionSchema.safeParse({
    title,
    summary,
    url,
    technology,
    overview,
    solution,
    can: canArray,
  });

  if (!validatedFields.success) {
    const errors = {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "バリデーションエラー",
    };
    console.log(errors);
    return errors;
  }

  try {
    await prisma.appIntroduction.update({
      where: {
        id: appId,
      },
      data: {
        title,
        summary,
        url,
        technology,
        overview,
        solution,
        can: canArray,
      },
    });
    console.log("アプリの編集に成功しました。");
  } catch (error) {
    console.error("アプリの編集の際にエラーが発生しました。:", error);
    return { message: "アプリの編集の際にエラーが発生しました。" };
  }
  redirect("/dashboard");
};

export const deleteAppIntroduction = async (formData: FormData) => {
  const id = formData.get("appId") as string;

  try {
    await prisma.appIntroduction.delete({
      where: {
        id,
      },
    });
    console.log("アプリの削除に成功しました。");
  } catch (error) {
    console.error("アプリの削除の際にエラーが発生しました。:", error);
    return { message: "アプリの削除の際にエラーが発生しました。" };
  }
  redirect("/dashboard");
};
