import Link from "next/link";
import NewAppsList from "./components/topPage/NewAppsList";
import { getAllAppIntroductions } from "./lib/AppIntroductionService";
import CTASection from "./components/topPage/CTASection";
import OneColumn from "./components/layouts/OneColumn";
import One from "./components/parts/One";
import TwoColumnImageAndText from "./components/parts/TwoColumnImageAndText";

export default async function Home() {
  const appIntroductions = await getAllAppIntroductions();

  if (!appIntroductions) {
    return null;
  }

  return (
    <OneColumn>
      <NewAppsList appIntroductions={appIntroductions} />
      <TwoColumnImageAndText
        title={"title"}
        contents={["aaa", "bbb", "ccc"]}
        src={"/test.jpg"}
        alt={"fff"}
      />
      <CTASection
        title="アプリを登録する"
        texts={[
          "メモブックは「完全無料で利用できるwebアプリ」です。",
          "PC・スマホ・タブレット」の、「android・iphone」などの、どの端末でもインターネットに接続できれば利用が可能となっています。",
          "登録は「emailアドレス」「パスワード」の2つを入力しアカウントを作成すれば、利用ができます。",
        ]}
        buttonText="登録"
      />
      <ul>
        <li>
          <Link href="/dashboard">ダッシュボード</Link>
        </li>
        <li>
          <Link href="/user">登録しているユーザー一覧</Link>
        </li>
        <li>
          <Link href="/app">登録されてるアプリ一覧</Link>
        </li>
      </ul>
    </OneColumn>
  );
}
