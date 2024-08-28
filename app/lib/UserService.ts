import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
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

    return allUserData
  } catch (error) {
    console.error("全てのユーザーのデータ取得中にエラーが発生しました。:", error);
    return 
  }
};

export const getUserData = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });


    if (!user) {
      return null;
    }

    const appIntroductions = await prisma.appIntroduction.findMany({
      where: {
        userId: user.id,
      },
    });

    return {
      id: user.id,
      name:  user.name,
      profile: user.profile,
      appIntroductions,
    };
  } catch (error) {
    console.error("プロフィールの取得中にエラーが発生しました:", error);
    return 
  }
};

export const getUserProfile = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      profile: user.profile,
    };
  } catch (error) {
    console.error("プロフィールの取得中にエラーが発生しました:", error);
    return 
  }
};
