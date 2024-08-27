import Image from "next/image";
import Modal from "./ui/Modal";
import FormAuth from "./auth/FormAuth";
import { signUp } from "../action/ActionAuth";
import FormLogin from "./auth/FormLogin";

const Header = () => {
  return (
    <header className="flex justify-between items-center w-full max-w-[1140px] mx-auto px-2">
      <Image src="/logo.png" width={200} height={80} alt="ロゴ" />
      <ul className="flex">
        <li className="px-4 py-2">
          <Modal buttonText="ログイン" buttonColor="blue" buttonSize="small">
            <FormLogin />
          </Modal>
        </li>
        <li className="px-4 py-2">
          <Modal buttonText="登録" buttonColor="blue" buttonSize="small">
            <FormAuth formAction={signUp} />
          </Modal>
        </li>
      </ul>
    </header>
  );
};

export default Header;
