import TwoColumn from "../components/layouts/with-children/TwoColumn";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TwoColumn>{children}</TwoColumn>;
}
