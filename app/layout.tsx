import type { Metadata } from "next";
import { notoSansJp } from "./utils/font";

import "./globals.css";

import Header from "./components/web-parts/global/Header";
import Footer from "./components/web-parts/global/Footer";

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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
