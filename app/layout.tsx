import type { Metadata } from "next";
import { notoSansJp } from "./components/util/font";

import "./globals.css";
import Header from "./components/web-parts/Header";
import Footer from "./components/web-parts/Footer";
import AuthContext from "./components/context/AuthContext";

export const metadata: Metadata = {
  title: {
    default: "タイトル「アプリタイトル」",
    template: "%s | アプリタイトル",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJp.className} flex flex-col min-h-screen`}>
          <AuthContext>
            <Header />
            {children}
            <Footer />
          </AuthContext>
      </body>
    </html>
  );
}
