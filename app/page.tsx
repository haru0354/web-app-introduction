import Link from "next/link";
import { getAllAppIntroductions } from "./lib/AppIntroductionService";
import { shuffleArray } from "./lib/ShuffleArray";
import TopPageSection from "./components/layouts/with-children/TopPageSection";
import InfoCard from "./components/InfoCard";
import TwoColumnImageAndText from "./components/layouts/TwoColumnImageAndText";
import Hero from "./components/top-page/Hero";
import CTASection from "./components/top-page/CTASection";
import AboutSection from "./components/top-page/AboutSection";
import NewAppsListInfo from "./components/top-page/NewAppsListInfo";

export default async function Home() {
  const appIntroductions = await getAllAppIntroductions();

  if (!appIntroductions) {
    return null;
  }

  const randomAppIntroductions = shuffleArray(appIntroductions).slice(0, 2);

  return (
    <main className="flex flex-col items-center justify-center w-full">
      <Hero title={""} texts={[]} buttonText={""} />
      <TopPageSection>
        <InfoCard
          title={randomAppIntroductions[0].title}
          content={randomAppIntroductions[0].title}
          src={randomAppIntroductions[0].images[0]?.imageURL}
          alt={randomAppIntroductions[0].images[0]?.imageALT}
        />
      </TopPageSection>
      <NewAppsListInfo appIntroductions={appIntroductions} />
      <AboutSection
        title="当サイトについて"
        leftTitle="WEB閲覧者側"
        leftContents={[
          "WEBアプリと言ってもどんなのがあるか分からない・・・",
          "●●では様々なアプリが掲載されています。",
          "また、どんなアプリか一目で分かるようになっています",
        ]}
        rightTitle="アプリ製作者側"
        rightContents={[
          "無料で自作アプリの掲載をすることができます。",
          "必要なのは簡単な登録作業のみ。",
          "下記ボタンよりご利用ください。",
        ]}
        buttonText="登録"
        buttonLinkURL="/signup"
      />
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
      <TopPageSection>
        <InfoCard
          title={randomAppIntroductions[1].title}
          content={randomAppIntroductions[1].title}
          src={randomAppIntroductions[1].images[0]?.imageURL}
          alt={randomAppIntroductions[1].images[0]?.imageALT}
        />
      </TopPageSection>
      <CTASection
        title="アプリを登録する"
        texts={[
          "アカウント作成して簡単に自作したWEBアプリの登録をすることができます。",
          "完全無料で使用することができ、自作アプリの宣言の場としての使用が可能です",
          "アプリの登録は下記ボタンよりアカウントの作成をしてください。",
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
    </main>
  );
}
