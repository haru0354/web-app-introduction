"use client";

import { useSession } from "next-auth/react";
import NextLinkButton from "./NextLinkButton";

const DashboardOrRegisterLink = () => {
  const { data: session } = useSession();

  const link = session
    ? { href: "/dashboard", label: "ダッシュボード" }
    : { href: "/signup", label: "登録" };

  return (
    <div className="flex items-center justify-center">
      <NextLinkButton href={link.href} color="blue" className="rounded">
        {link.label}
      </NextLinkButton>
    </div>
  );
};

export default DashboardOrRegisterLink;
