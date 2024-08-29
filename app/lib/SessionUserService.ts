import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "../lib/prisma";

export const getSessionUser = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        appIntroductions: true,
      }
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      profile: user.profile,
      appIntroductions: user.appIntroductions,
    };
  } catch (error) {
    console.error(
      "ログイン中のユーザーデータ取得中にエラーが発生しました:",
      error
    );
    return;
  }
};

export const getSessionUserProfile = async () => {
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
    console.error(
      "ログイン中のユーザープロフィールの取得中にエラーが発生しました:",
      error
    );
    return;
  }
};
