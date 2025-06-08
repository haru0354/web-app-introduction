import OneColumn from "../components/layouts/column/OneColumn";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <OneColumn center={true}>{children}</OneColumn>;
}
