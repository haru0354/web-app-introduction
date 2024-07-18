import ImageSlider from "@/app/components/webPage/ImageSlider";
import prisma from "@/app/lib/prisma";
import NotFound from "@/app/not-found";

const page = async ({ params }: { params: { app_id: string } }) => {
  const id = params.app_id;

  const appData = await prisma.appIntroduction.findUnique({
    where: {
      id,
    },
  });

  if (appData === null) {
    return <NotFound />;
  }

  return (
    <>
      <h1 className="text-2xl font-bold py-2">{appData.title}の詳細</h1>
      {appData.imageUrl && (
        <ImageSlider
          imageUrls={appData.imageUrl}
          imageAlts={appData.imageAlt}
        />
      )}      
      <p>アプリの特徴：　{appData.summary}</p>
      <p>URL：　{appData.url}</p>
      <p>使用技術：　{appData.technology}</p>
      <h2 className="font-semibold text-xl my-4 py-2 border-b border-dashed border-gray-700">
        「{appData.title}」で出来ること
      </h2>
      <ul className="my-8 mx-12 py-2 px-4 border border-gray-400">
        {appData.can.map((can, index) => {
          return (
            <li className="my-2" key={index}>
              {can}
            </li>
          );
        })}
      </ul>
      <h2 className="font-semibold text-xl my-4 py-2 border-b border-dashed border-gray-700">
        「{appData.title}」の概要
      </h2>
      {appData.overview}
      <h2 className="font-semibold text-xl my-4 py-2 border-b border-dashed border-gray-700">
        「{appData.title}」がおすすめな人・解決できること
      </h2>
      {appData.solution}
    </>
  );
};

export default page;
