import Image from "next/image";
import Modal from "./ui/Modal";
import FormAuth from "./auth/FormAuth";
import { signUp } from "../action/ActionAuth";

const Header = () => {
  return (
    <header className="flex justify-between items-center w-full max-w-[1140px] mx-auto px-2">
      <Image src="/logo.png" width={200} height={80} alt="ロゴ" />
      <ul className="flex">
        <li className="px-4 py-2">ログイン</li>
        <li className="px-4 py-2">
          <Modal buttonText="登録" buttonColor="blue" buttonSize="small">
            <FormAuth formName="アカウント登録" formAction={signUp} />
          </Modal>
        </li>
      </ul>
    </header>
  );
};

export default Header;
