import prisma from "@/app/lib/prisma";
import Image from "next/image";
import Link from "next/link";

const page = async () => {
  const appAll = await prisma.appIntroduction.findMany();

  return (
    <>
      <h1 className="h1">WEBアプリの一覧ページ</h1>
      <div className="flex flex-wrap">
        {appAll.map((app) => {
          const imageUrl =
            app.images.length > 0 && app.images[0].imageURL
              ? `/${app.images[0].imageURL}`
              : "/no-image.jpg";

          const imageAlt =
            app.images.length > 0 && app.images[0].imageALT
              ? app.images[0].imageALT
              : "アプリの画像";
              
          return (
            <div className="flex flex-col min-w-[200px] min-h-[200px] mx-2 my-6 text-center">
              <Link href={`/app/${app.id}`} key={app.id}>
                <Image
                  src={imageUrl}
                  width={200}
                  height={200}
                  alt={imageAlt}
                  className="border border-gray-400 rounded hover:-translate-y-2 transition"
                />
              </Link>
              <h2 className="text-gray-600 font-semibold">{app.title}</h2>
              {app.summary}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default page;
