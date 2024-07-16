import Image from "next/image";

const Header = () => {
  return (
    <header className="flex justify-between items-center w-full max-w-[1140px] mx-auto px-2 border-b border-gray-700">
      <Image src="/logo.png" width={200} height={80} alt="ロゴ" />
      <ul className="flex">
        <li className="px-4 py-2">ログイン</li>
        <li className="px-4 py-2">登録</li>
      </ul>
    </header>
  );
};

export default Header;
