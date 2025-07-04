import { Metadata } from "next";

import OneColumn from "../components/layouts/column/OneColumn";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <OneColumn>{children}</OneColumn>;
}
