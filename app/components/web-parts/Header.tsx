"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import Modal from "./Modal";
import FormLogin from "../form/FormLogin";
import Button from "../ui/button/Button";
import LogoutButton from "../ui/button/LogoutButton";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="w-full bg-layout-mainColor">
      <div className="flex justify-between items-center w-full max-w-[1140px] mx-auto px-2">
        <Link href="/">
          <Image src="/logo.png" width={200} height={80} alt="ロゴ" />
        </Link>
        <ul className="flex">
          {session ? (
            <>
              <li className="px-4 py-2">
                <LogoutButton />
              </li>
              <li className="px-4 py-2 my-auto text-white transition-colors duration-300 hover:text-customBlue">
                <Link href="/dashboard">ダッシュボード</Link>
              </li>
            </>
          ) : (
            <>
              <li className="px-4 py-2">
                <Modal
                  buttonText="ログイン"
                  width="400"
                  buttonColor="black"
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
      </div>
    </header>
  );
};

export default Header;
