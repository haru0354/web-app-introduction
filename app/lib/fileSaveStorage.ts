"use server";

import { supabase } from "../components/util/Supabase";

export const fileSaveStorage = async (image: File, userId: string) => {
  try {
    const fileName = `${Date.now()}_${image.name}`;
    const directory = `app-introduction/${userId}`;
    const saveFileUrl = `${directory}/${fileName}`;

    await supabase.storage.from("app").upload(saveFileUrl, image);

    const { data } = supabase.storage.from("app").getPublicUrl(saveFileUrl);
    const imageURL = data.publicUrl;

    console.log("画像の保存に成功しました。");
    return imageURL;
  } catch (error) {
    console.error("画像の保存時にエラーが発生しました。", error);
    throw error;
  }
};
