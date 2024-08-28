import Image from "next/image";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { signUp } from "../action/ActionUser";
import FormLogin from "./auth/FormLogin";
import LogoutButton from "./auth/LogoutButton";
import Modal from "./ui/Modal";
import FormSignUp from "./auth/FormSignUp";

const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="flex justify-between items-center w-full max-w-[1140px] mx-auto px-2">
      <Image src="/logo.png" width={200} height={80} alt="ロゴ" />
      <ul className="flex">
        <li className="px-4 py-2">
          {session ? (
            <LogoutButton />
          ) : (
            <Modal buttonText="ログイン" buttonColor="white" buttonSize="small">
              <FormLogin />
            </Modal>
          )}
        </li>
        <li className="px-4 py-2">
          <Modal buttonText="登録" buttonColor="blue" buttonSize="small">
            <FormSignUp formAction={signUp} />
          </Modal>
        </li>
      </ul>
    </header>
  );
};

export default Header;