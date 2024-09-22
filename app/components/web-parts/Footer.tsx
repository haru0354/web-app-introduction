import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center w-full py-1 text-sm text-white bg-gray-900">
      <ul className="flex">
        <li className="py-1 mx-4 hover:text-customBlue">
          <Link href="/privacypolicy">プライバシーポリシー・免責事項</Link>
        </li>
      </ul>
      <p>&copy;サイトタイトル</p>
    </footer>
  );
};

export default Footer;
