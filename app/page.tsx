import Link from "next/link";
import NewAppsList from "./components/top-page/NewAppsList";
import { getAllAppIntroductions } from "./lib/AppIntroductionService";
import CTASection from "./components/top-page/CTASection";
import OneColumn from "./components/layouts/with-children/OneColumn";
import TwoColumnImageAndText from "./components/layouts/TwoColumnImageAndText";
import AboutSection from "./components/top-page/AboutSection";
import TopPageSection from "./components/layouts/with-children/TopPageSection";
import InfoCard from "./components/InfoCard";
import NewAppsListInfo from "./components/top-page/NewAppsListInfo";
import TwoFlexBox from "./components/layouts/TwoFlexBox";
import Hero from "./components/top-page/Hero";

export default async function Home() {
  const appIntroductions = await getAllAppIntroductions();

  if (!appIntroductions) {
    return null;
  }

  return (
    <OneColumn>
      <Hero title={""} texts={[]} buttonText={""} />
      <NewAppsListInfo appIntroductions={appIntroductions} />
      <TopPageSection>
        <InfoCard
          title={"title"}
          content={"content"}
          src={"/test.JPG"}
          alt={"a"}
        />
      </TopPageSection>
      <AboutSection />
      <TopPageSection>
        <h2 className="h2">webサイトのBLOG記事</h2>
        <TwoColumnImageAndText
          contents={["aaa", "bbb", "ccc"]}
          src={"/test.jpg"}
          alt={"fff"}
        />
      </TopPageSection>
      <TopPageSection>
        <h2 className="h2">webサイトのカテゴリ</h2>
        <TwoColumnImageAndText
          contents={["aaa", "bbb", "ccc"]}
          src={"/test.jpg"}
          alt={"fff"}
        />
      </TopPageSection>
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
