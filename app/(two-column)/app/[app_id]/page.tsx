import Link from "next/link";
import { getAppIntroduction } from "@/app/lib/appIntroductionService";
import ImageSlider from "@/app/components/web-parts/contents-area/ImageSlider";
import NotFound from "@/app/not-found";

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
      <ul>
        <li className="pb-2 mb-2 border-b border-dashed border-customBlack">
          アプリの特徴：{appIntroduction.summary}
        </li>
        <li className="pb-2 mb-2 border-b border-dashed border-customBlack">
          URL：{appIntroduction.url}
        </li>
        <li className="pb-2 mb-2 border-b border-dashed border-customBlack">
          使用技術：{appIntroduction.technology}
        </li>
        {appIntroduction.userName ? (
          <li className="pb-2 mb-2 border-b border-dashed border-customBlack">
            アプリ製作者のページ：
            <Link
              href={`/user/${appIntroduction.userId}`}
              className="text-customBlue"
            >
              {appIntroduction.userName}
            </Link>
          </li>
        ) : (
          <li className="pb-2 mb-2 border-b border-dashed border-customBlack">
            <Link
              href={`/user/${appIntroduction.userId}`}
              className="text-customBlue"
            >
              アプリ製作者のページ
            </Link>
          </li>
        )}
      </ul>
      {appIntroduction.can.length > 0 && (
        <>
          <h2 className="h2">「{appIntroduction.title}」で出来ること</h2>
          <ul className="list-disc list-inside my-8 mx-12 py-2 px-6 border rounded border-gray-400">
            {appIntroduction.can.map((can, index) => {
              return (
                <li className="my-2" key={index}>
                  {can}
                </li>
              );
            })}
          </ul>
        </>
      )}
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
