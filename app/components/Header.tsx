"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import FormLogin from "./form/FormLogin";
import LogoutButton from "./ui/LogoutButton";
import Button from "./ui/Button";
import Modal from "./Modal";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="flex justify-between items-center w-full max-w-[1140px] mx-auto px-2">
      <Link href="/">
        <Image src="/logo.png" width={200} height={80} alt="ロゴ" />
      </Link>
      <ul className="flex">
        {session ? (
          <>
            <li className="px-4 py-2">
              <LogoutButton />
            </li>
            <li className="px-4 py-2 my-auto">
              <Link href="/dashboard">ダッシュボード</Link>
            </li>
          </>
        ) : (
          <>
            <li className="px-4 py-2">
              <Modal
                buttonText="ログイン"
                width="400"
                buttonColor="white"
                buttonSize="small"
              >
                <FormLogin />
              </Modal>
            </li>
            <li className="px-4 py-2">
              <Link href="/signup">
                <Button size="small" color="blue">
                  登録
                </Button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
