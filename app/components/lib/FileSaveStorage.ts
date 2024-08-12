"use server";

import { supabase } from "../util/Supabase";

export const FileSaveStorage = async (image: File, userId: string) => {
  try {
    const fileName = `${Date.now()}_${image.name}`;
    const directory = `itinerary/${userId}`;
    const saveFileUrl = `${directory}/${fileName}`;

    await supabase.storage.from("app").upload(saveFileUrl, image);

    const { data } = supabase.storage.from("app").getPublicUrl(saveFileUrl);
    const fileUrl = data.publicUrl;

    console.log("画像の保存に成功しました。");
    return { fileUrl, fileName };
  } catch (error) {
    console.error("画像の保存時にエラーが発生しました。", error);
    throw error;
  }
};
