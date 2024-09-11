import Link from "next/link";
import Image from "next/image";
import { getAllAppIntroductions } from "@/app/lib/appIntroductionService";

const page = async () => {
  const allAppIntroductions = await getAllAppIntroductions();

  if (!allAppIntroductions) {
    return null;
  }

  return (
    <>
      <h1 className="h1">WEBアプリの一覧ページ</h1>
      <div className="flex flex-wrap">
        {allAppIntroductions.map((appIntroduction) => {
          const imageUrl =
            appIntroduction.images.length > 0 &&
            appIntroduction.images[0].imageURL
              ? `/${appIntroduction.images[0].imageURL}`
              : "/no-image.jpg";
          const imageAlt =
            appIntroduction.images.length > 0 &&
            appIntroduction.images[0].imageALT
              ? appIntroduction.images[0].imageALT
              : "アプリの画像";
          return (
            <div className="flex flex-col min-w-[200px] min-h-[200px] mx-2 my-6 text-center">
              <Link
                href={`/app/${appIntroduction.id}`}
                key={appIntroduction.id}
              >
                <Image
                  src={imageUrl}
                  width={200}
                  height={200}
                  alt={imageAlt}
                  className="border border-gray-400 rounded hover:-translate-y-2 transition"
                />
              </Link>
              <h2 className="text-gray-600 font-semibold">
                {appIntroduction.title}
              </h2>
              {appIntroduction.summary}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default page;
