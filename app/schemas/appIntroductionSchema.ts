import { z } from "zod";

export const appIntroductionSchema = z.object({
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

export const ImageSchema = z.object({
  imageALT: z
    .string()
    .min(1, { message: "画像の保存時には「画像の説明」の入力は必須です。" }),
});
