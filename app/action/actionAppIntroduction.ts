"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import prisma from "../lib/prisma";
import { getSessionUserId } from "../lib/service/sessionUserService";
import { fileSaveStorage } from "../lib/file-save/fileSaveStorage"; 
import { validateMimeTypeAndExtension } from "../lib/file-save/validateMimeTypeAndExtension"; 

import {
  appIntroductionSchema,
  ImageSchema,
} from "../schemas/appIntroductionSchema";
import type { AppIntroductionFormState } from "@/types/formStateTypes";

export const addAppIntroduction = async (
  state: AppIntroductionFormState,
  formData: FormData
) => {
  const title = formData.get("title") as string;
  const summary = formData.get("summary") as string;
  const url = formData.get("url") as string;
  const technology = formData.get("technology") as string;
  const overview = formData.get("overview") as string;
  const solution = formData.get("solution") as string;
  const image = formData.get("imageFile") as File;
  const imageALT = formData.get("imageALT") as string;
  const sessionUserId = await getSessionUserId();

  if (!sessionUserId) {
    console.error("メールアドレス変更中にセッションの取得に失敗しました。");
    return { message: "再度ログイン後にお試しください。（認証エラー）" };
  }

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
      message: "正しい形式でフォームを入力してください。",
    };
    console.log("バリデーションエラー：", errors);
    return errors;
  }

  let imageURL;

  if (image && image.size > 0) {
    try {
      const ImageValidatedFields = ImageSchema.safeParse({
        imageALT,
      });

      if (!ImageValidatedFields.success) {
        const errors = {
          errors: ImageValidatedFields.error.flatten().fieldErrors,
        };
        console.log(errors);
        return errors;
      }

      const isValidFile = await validateMimeTypeAndExtension(image);

      if (!isValidFile) {
        const errors = {
          errors: {
            image: [
              "画像ファイルが無効です。有効な画像ファイルを選択してください。",
            ],
          },
        };
        console.log(errors);
        return errors;
      }

      imageURL = await fileSaveStorage(image, sessionUserId);
    } catch (error) {
      console.error("画像の追加時にエラーが発生しました", error);
      return { message: "画像の追加時にエラーが発生しました" };
    }
  }

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
        images: imageURL
          ? [
              {
                imageURL,
                imageALT,
              },
            ]
          : [],
        userId: sessionUserId,
      },
    });
  } catch (error) {
    console.error("アプリの追加の際にエラーが発生しました。:", error);
    return { message: "アプリの追加の際にエラーが発生しました。" };
  }
  revalidatePath("/dashboard");
  return { message: "success" };
};

export const updateAppIntroduction = async (
  state: AppIntroductionFormState,
  formData: FormData
) => {
  const title = formData.get("title") as string;
  const summary = formData.get("summary") as string;
  const url = formData.get("url") as string;
  const technology = formData.get("technology") as string;
  const overview = formData.get("overview") as string;
  const solution = formData.get("solution") as string;
  const image = formData.get("imageFile") as File;
  const imageALT = formData.get("imageALT") as string;
  const appId = formData.get("appId") as string;
  const sessionUserId = await getSessionUserId();

  if (!sessionUserId) {
    console.error("メールアドレス変更中にセッションの取得に失敗しました。");
    return { message: "再度ログイン後にお試しください。（認証エラー）" };
  }

  const appIntroduction = await prisma.appIntroduction.findUnique({
    where: {
      id: appId,
    },
    include: {
      user: true,
    },
  });

  if (!appIntroduction) {
    console.error("登録しているアプリが見つかりません。");
    return {
      message: "登録しているアプリが見つかりません。再度編集をしてください。",
    };
  }

  if (appIntroduction.userId !== sessionUserId) {
    console.error("登録しているユーザーとセッションが一致しませんでした。");
    return { message: "再度ログイン後にお試しください。（編集エラー）" };
  }

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

  let imageURL;

  if (image && image.size > 0) {
    try {
      const ImageValidatedFields = ImageSchema.safeParse({
        imageALT,
      });

      if (!ImageValidatedFields.success) {
        const errors = {
          errors: ImageValidatedFields.error.flatten().fieldErrors,
        };
        console.log(errors);
        return errors;
      }

      const isValidFile = await validateMimeTypeAndExtension(image);

      if (!isValidFile) {
        const errors = {
          errors: {
            image: [
              "画像ファイルが無効です。有効な画像ファイルを選択してください。",
            ],
          },
        };
        console.log(errors);
        return errors;
      }

      imageURL = await fileSaveStorage(image, sessionUserId);
    } catch (error) {
      console.error("画像の追加時にエラーが発生しました", error);
      return { message: "画像の追加時にエラーが発生しました" };
    }
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
        images: imageURL
          ? [
              {
                imageURL,
                imageALT,
              },
            ]
          : [],
      },
    });
  } catch (error) {
    console.error("アプリの編集の際にエラーが発生しました。:", error);
    return { message: "アプリの編集の際にエラーが発生しました。" };
  }
  redirect("/dashboard");
};

export const deleteAppIntroduction = async (formData: FormData) => {
  const appId = formData.get("appId") as string;
  const sessionUserId = await getSessionUserId();

  if (!sessionUserId) {
    console.error("メールアドレス変更中にセッションの取得に失敗しました。");
    return { message: "再度ログイン後にお試しください。（認証エラー）" };
  }

  const appIntroduction = await prisma.appIntroduction.findUnique({
    where: {
      id: appId,
    },
    include: {
      user: true,
    },
  });

  if (!appIntroduction) {
    console.error("登録しているアプリが見つかりません。");
    return {
      message:
        "登録しているアプリが見つかりません。再度、削除をやり直してください。",
    };
  }

  if (appIntroduction.userId !== sessionUserId) {
    console.error("登録しているユーザーとセッションが一致しませんでした。");
    return {
      message: "再度、削除をやり直してください。（セッションエラー）",
    };
  }

  try {
    await prisma.appIntroduction.delete({
      where: {
        id: appId,
      },
    });
  } catch (error) {
    console.error("アプリの削除の際にエラーが発生しました。:", error);
    return { message: "アプリの削除の際にエラーが発生しました。" };
  }
  redirect("/dashboard");
};
