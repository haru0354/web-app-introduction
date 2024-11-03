import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center w-full py-1 text-sm text-white bg-layout-mainColor">
      <ul className="flex">
        <li className="py-1 mx-4 transition-colors duration-300 hover:text-customBlue">
          <Link href="/privacypolicy">プライバシーポリシー・免責事項</Link>
        </li>
        <li className="py-1 mx-4 transition-colors duration-300 hover:text-customBlue">
          <Link href="/sitemaps">サイトマップ</Link>
        </li>
      </ul>
      <p>&copy;サイトタイトル</p>
    </footer>
  );
};

export default Footer;
