import prisma from "../lib/prisma";

export const getAllUser = async () => {
  try {
    const allUser = await prisma.user.findMany();

    if (!allUser) {
      return null;
    }

    const allUserData = allUser.map((user) => ({
      id: user.id,
      name: user.name,
      image: user.image,
      profile: user.profile,
    }));

    return allUserData;
  } catch (error) {
    console.error("全てのユーザーデータ取得中にエラーが発生しました。:", error);
    return;
  }
};
