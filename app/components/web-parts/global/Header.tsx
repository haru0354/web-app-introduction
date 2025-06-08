import Image from "next/image";
import Link from "next/link";

import HeaderMenu from "./HeaderMenu";
import AuthContext from "@/app/context/AuthContext";

const Header = () => {
  return (
    <header className="w-full bg-layout-mainColor">
      <div className="flex justify-between items-center w-full max-w-[1140px] mx-auto px-2">
        <Link href="/">
          <Image src="/logo.png" width={200} height={80} alt="ロゴ" />
        </Link>
        <AuthContext>
          <HeaderMenu />
        </AuthContext>
      </div>
    </header>
  );
};

export default Header;
