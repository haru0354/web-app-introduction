"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

import Modal from "../Modal";
import FormLogin from "../../form/FormLogin";
import LogoutButton from "../../ui/button/LogoutButton";

const HeaderMenu = ({}) => {
  const { data: session } = useSession();

  return (
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
          <li className="mx-2 px-4 py-2">
            <Modal
              buttonText="ログイン"
              width="400"
              buttonColor="black"
              buttonSize="small"
            >
              <FormLogin />
            </Modal>
          </li>
          <li className="mx-2 px-4 py-2 my-auto rounded text-white hover:text-customBlack bg-sky-700 hover:bg-sky-200 transition-colors duration-300">
            <Link href="/signup">登録</Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default HeaderMenu;
