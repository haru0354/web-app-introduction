"use client";

import { signOut } from "next-auth/react";
import Button from "../ui/Button";

const LogoutButton = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <Button color="white" size="small" onClick={handleLogout}>
      ログアウト
    </Button>
  );
};

export default LogoutButton;
