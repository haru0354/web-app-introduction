import prisma from "../lib/prisma";

export const getAllAppIntroductions = async () => {
  const allAppIntroductions = await prisma.appIntroduction.findMany();

  if (!allAppIntroductions) {
    return null;
  }

  return allAppIntroductions;
};
