import { Metadata } from "next";
import Link from "next/link";

import { getAllAppIntroductions } from "@/app/lib/appIntroductionService";
import BlogTopInfo from "@/app/components/layouts/BlogTopInfo";

export const metadata: Metadata = {
  title: "サイトマップ",
  description:
    "このページではサイトマップとなります。当サイトの全ページへの動線が用意されており、該当のページへすぐにアクセスすることができます。",
};

const page = async () => {
  const allAppIntroductions = await getAllAppIntroductions();

  if (!allAppIntroductions) {
    return null;
  }

  return (
    <>
      <BlogTopInfo title="サイトマップ" date="2024-11-03" image={false} />
      <ul className="list-disc list-inside mx-4">
        <li className="py-2 font-semibold">
          <Link href="/app">WEBアプリ一覧ページ</Link>
        </li>
        <ul className="list-disc list-inside mx-6">
          {allAppIntroductions.map((allAppIntroduction) => (
            <li key={allAppIntroduction.id} className="py-2">
              <Link href={`/app/${allAppIntroduction.id}`}>
                {allAppIntroduction.title}
              </Link>
            </li>
          ))}
        </ul>
        <li className="py-2 font-semibold">
          <Link href="/user">ユーザー一覧ページ</Link>
        </li>
      </ul>
      <ul className="list-disc list-inside mx-4">
        <li className="py-2 font-semibold">
          <Link href="/signup">アカウント登録ページ</Link>
        </li>
        <li className="py-2 font-semibold">
          <Link href="/privacypolicy">プライバシーポリシー</Link>
        </li>
      </ul>
    </>
  );
};

export default page;
