"use client"

import { signOut } from "next-auth/react";
import Button from "../ui/Button";

const LogoutButton = () => {
  const handleLogout = () => {
    signOut();
  };

  return (
    <Button color="blue" size="small" onClick={handleLogout}>
      ログアウト
    </Button>
  );
};

export default LogoutButton;
