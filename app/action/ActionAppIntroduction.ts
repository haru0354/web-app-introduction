"use server";

import { redirect } from "next/navigation";
import prisma from "../lib/prisma";

type FormState = {
  message?: string | null;
  errors?: {
    title?: string | undefined;
    summary?: string | undefined;
    url?: string | undefined;
    technology?: string | undefined;
    overview?: string | undefined;
    solution?: string | undefined;
    can?: string[] | undefined;
  };
};

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
        userId,
      },
    });
    console.log("アプリの追加に成功しました。");
    return { message: "addSuccess" };
  } catch (error) {
    console.error("アプリの追加の際にエラーが発生しました。:", error);
    return { message: "アプリの追加の際にエラーが発生しました。" };
  }
};

export const updateAppIntroduction = async (state: FormState, formData: FormData) => {
  const title = formData.get("title") as string;
  const summary = formData.get("summary") as string;
  const url = formData.get("url") as string;
  const technology = formData.get("technology") as string;
  const overview = formData.get("overview") as string;
  const solution = formData.get("solution") as string;
  const userId = formData.get("userId") as string;
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
        userId,
      },
    });
    console.log("アプリの編集に成功しました。");
  } catch (error) {
    console.error("アプリの編集の際にエラーが発生しました。:", error);
    return { message: "アプリの編集の際にエラーが発生しました。" };
  }
  redirect("/dashboard");
};
