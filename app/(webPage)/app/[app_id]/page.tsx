import ImageSlider from "@/app/components/webPage/ImageSlider";
import { getAppIntroduction } from "@/app/lib/AppIntroductionService";
import prisma from "@/app/lib/prisma";
import NotFound from "@/app/not-found";
import Link from "next/link";

const page = async ({ params }: { params: { app_id: string } }) => {
  const appId = params.app_id;
  const appIntroduction = await getAppIntroduction(appId);

  if (!appIntroduction) {
    return <NotFound />;
  }

  return (
    <>
      <h1 className="h1">{appIntroduction.title}の詳細</h1>
      {appIntroduction.images[0] && (
        <ImageSlider images={appIntroduction.images} />
      )}
      <p>アプリの特徴：{appIntroduction.summary}</p>
      <p>URL：{appIntroduction.url}</p>
      <p>使用技術：{appIntroduction.technology}</p>
      {appIntroduction.userName ? (
        <>
          アプリ製作者のページ：
          <Link href={`/user/${appIntroduction.userId}`} className="a">
            {appIntroduction.userName}
          </Link>
        </>
      ) : (
        <Link href={`/user/${appIntroduction.userId}`} className="a">
          アプリ製作者のページ
        </Link>
      )}
      <h2 className="h2">「{appIntroduction.title}」で出来ること</h2>
      <ul className="my-8 mx-12 py-2 px-4 border border-gray-400">
        {appIntroduction.can.map((can, index) => {
          return (
            <li className="my-2" key={index}>
              {can}
            </li>
          );
        })}
      </ul>
      <h2 className="h2">「{appIntroduction.title}」の概要</h2>
      {appIntroduction.overview}
      <h2 className="h2">
        「{appIntroduction.title}」がおすすめな人・解決できること
      </h2>
      {appIntroduction.solution}
    </>
  );
};

export default page;
