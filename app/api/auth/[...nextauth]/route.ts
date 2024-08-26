import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
      maxAge: 3 * 24 * 60 * 60, 
      strategy: "jwt",
    },
    providers: [  
      CredentialsProvider({
        id: "appIntroduction",
        name: "appIntroduction",
        credentials: {
          email: { label: "email", type: "text" },
          password: { label: "password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("メールアドレスとパスワードが存在しません");
          }
  
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });
  
          if (!user || !user?.hashedPassword) {
            throw new Error("ユーザーが存在しません");
          }
  
          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );
  
          if (!isCorrectPassword) {
            throw new Error("パスワードが一致しません");
          }
  
          if (user) {
            return {
              ...user,
            };
          } else {
            console.log("ユーザー情報の取得に失敗しました");
            return null;
          }
        },
      }),
    ],
    pages: {
      signIn: "/",
    },
    secret: process.env.NEXTAUTH_SECRET,
  };
  
  const handler = NextAuth(authOptions)

  export { handler as GET, handler as POST }