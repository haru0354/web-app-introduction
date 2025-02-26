import { z } from "zod";

export const profileSchema = z.object({
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
