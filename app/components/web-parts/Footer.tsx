import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center w-full py-1 text-sm text-white bg-green-600">
      <ul className="flex">
        <li className="py-1 mx-4">
          <Link href="/privacypolicy">プライバシーポリシー・免責事項</Link>
        </li>
      </ul>
      &copy;サイトタイトル
    </footer>
  );
};

export default Footer;
