import TwoColumn from "../components/layouts/column/TwoColumn";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TwoColumn blogPage={true}>{children}</TwoColumn>;
}
