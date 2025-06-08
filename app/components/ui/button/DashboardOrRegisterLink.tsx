"use client";

import { useSession } from "next-auth/react";
import NextLinkButton from "./NextLinkButton";

type DashboardOrRegisterLinkProps = {
  buttonColor: "red" | "blue" | "gray" | "white" | "black";
  buttonSize: "big" | "small" | "normal";
};

const DashboardOrRegisterLink: React.FC<DashboardOrRegisterLinkProps> = ({
  buttonColor,
  buttonSize,
}) => {
  const { data: session } = useSession();

  const link = session
    ? { href: "/dashboard", label: "ダッシュボードへ" }
    : { href: "/signup", label: "登録" };

  return (
      <div className="flex items-center justify-center">
        <NextLinkButton
          href={link.href}
          size={buttonSize}
          color={buttonColor}
          className="rounded"
        >
          {link.label}
        </NextLinkButton>
      </div>
  );
};

export default DashboardOrRegisterLink;
