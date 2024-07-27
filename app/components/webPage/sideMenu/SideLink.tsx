import Link from "next/link";

const SideLink = () => {
  return (
    <div>
      <h2 className="h2 pl-2">お役立ちリンク</h2>
      <ul className="list-disc ml-8 mb-4">
        <Link href="test"><li className="a py-2">test</li></Link>
        <Link href="test"><li className="a py-2">test2</li></Link>
        <Link href="test"><li className="a py-2">test3</li></Link>
      </ul>
    </div>
  );
};

export default SideLink;
