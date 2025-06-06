import Link from "next/link";

const SideLink = () => {
  return (
    <div>
      <h2 className="h2 pl-2">リンク</h2>
      <ul className="list-disc ml-8 mb-4 ">
        <li className="py-2 transition-colors duration-300 hover:text-customBlue">
          <Link href="/">test</Link>
        </li>
        <li className="py-2 transition-colors duration-300 hover:text-customBlue">
          <Link href="/">test</Link>
        </li>
        <li className="py-2 transition-colors duration-300 hover:text-customBlue">
          <Link href="/">test</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideLink;
