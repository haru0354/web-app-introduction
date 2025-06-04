import { signOut } from "next-auth/react";
import Button from "./Button";

const LogoutButton = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <Button type="button" color="black" size="small" onClick={handleLogout}>
      ログアウト
    </Button>
  );
};

export default LogoutButton;
