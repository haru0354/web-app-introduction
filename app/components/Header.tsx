import Image from "next/image";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { signUp } from "../action/ActionUser";
import FormLogin from "./auth/FormLogin";
import LogoutButton from "./auth/LogoutButton";
import Modal from "./layouts/with-children/Modal";
import FormSignUp from "./auth/FormSignUp";
import Link from "next/link";
import Button from "./ui/Button";

const Header = async () => {
  const session = await getServerSession(authOptions);

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
