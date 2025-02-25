import Image from "next/image";
import Link from "next/link";

import prisma from "@/app/lib/prisma";

const NewAppIntroductions = async () => {
  const appIntroductions = await prisma.appIntroduction.findMany();

  const sortedAppIntroductions = appIntroductions.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const threeIntroductions = sortedAppIntroductions.slice(0, 3);

  return (
    <div className="w-full">
      <h2 className="h2 pl-2">新着のアプリ</h2>
      {threeIntroductions.map((appIntroduction) => {
        const imageUrl = appIntroduction.images.length > 0 && appIntroduction.images[0].imageURL
          ? `/${appIntroduction.images[0].imageURL}`
          : "/no-image.jpg";

        const imageAlt = appIntroduction.images.length > 0 && appIntroduction.images[0].imageALT
          ? appIntroduction.images[0].imageALT
          : "アプリの画像";

        return (
          <div key={appIntroduction.id} className="w-full text-center my-6 hover:-translate-y-2 transition">
            <Link href={`/app/${appIntroduction.id}`}>
                <Image
                  src={imageUrl}
                  width={200}
                  height={200}
                  alt={imageAlt}
                  className="mx-auto border border-gray-400 rounded"
                />
                <h3 className="font-semibold mt-3">{appIntroduction.title}</h3>
                <p className="text-sm">「{appIntroduction.summary}」</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default NewAppIntroductions;
