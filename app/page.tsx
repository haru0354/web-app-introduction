import { getAllAppIntroductions } from "./lib/AppIntroductionService";
import { shuffleArray } from "./lib/ShuffleArray";
import TopPageSection from "./components/layouts/with-children/TopPageSection";
import InfoCard from "./components/web-parts/contents-area/InfoCard";
import Hero from "./components/section/Hero";
import CTASection from "./components/section/CTASection";
import AboutSection from "./components/section/AboutSection";
import NewAppsVerticalSection from "./components/section/NewAppsVerticalSection";
import ContentsListSection from "./components/section/ContentsListSection";

export default async function Home() {
  const appIntroductions = await getAllAppIntroductions();

  if (!appIntroductions) {
    return null;
  }

  const randomAppIntroductions = shuffleArray(appIntroductions).slice(0, 2);

  const articles = [
    {
      title: "テスト",
      url: "/",
      imageSrc: "/blog-test.webp",
      imageAlt: "test",
    },
  ];

  const categories = [
    {
      title: "テスト",
      url: "/",
      imageSrc: "/blog-test.webp",
      imageAlt: "test",
    },
  ];

  return (
    <main className="flex flex-col items-center justify-center w-full">
      <Hero />
      <TopPageSection>
        <InfoCard
          title={randomAppIntroductions[0].title}
          content={randomAppIntroductions[0].title}
          linkURL={`/app/${randomAppIntroductions[0].id}`}
          src={randomAppIntroductions[0].images[0]?.imageURL}
          alt={randomAppIntroductions[0].images[0]?.imageALT}
        />
      </TopPageSection>
      <NewAppsVerticalSection
        appIntroductions={appIntroductions}
        title="新着アプリ"
      />
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
      <ContentsListSection listTitle="新着記事" contents={articles} />
      <ContentsListSection listTitle="新着カテゴリ" contents={categories} />
      <TopPageSection>
        <InfoCard
          title={randomAppIntroductions[1].title}
          content={randomAppIntroductions[1].title}
          linkURL={`/app/${randomAppIntroductions[1].id}`}
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
        linkURL="/signup"
      />
    </main>
  );
}
