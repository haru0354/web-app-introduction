import prisma from "../prisma";

export const getAllAppIntroductions = async () => {
  const allAppIntroductions = await prisma.appIntroduction.findMany();

  if (!allAppIntroductions) {
    return null;
  }

  return allAppIntroductions;
};

export const getAppIntroduction = async (appId: string) => {
  const appIntroduction = await prisma.appIntroduction.findUnique({
    where: {
      id: appId,
    },
    include: {
      user: true,
    },
  });

  if (!appIntroduction) {
    return null;
  }

  return {
    userId: appIntroduction.user.id,
    userName: appIntroduction.user.name,
    images: appIntroduction.images,
    id: appIntroduction.id,
    title: appIntroduction.title,
    summary: appIntroduction.summary,
    url: appIntroduction.url,
    technology: appIntroduction.technology,
    overview: appIntroduction.overview,
    solution: appIntroduction.solution,
    can: appIntroduction.can,
    createdAt: appIntroduction.createdAt,
    updatedAt: appIntroduction.updatedAt,
  };
};
