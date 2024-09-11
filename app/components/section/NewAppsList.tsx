import Image from "next/image";
import Link from "next/link";
import TopPageSection from "../layouts/with-children/TopPageSection";

type NewAppsListProps = {
  appIntroductions: AppIntroductions[];
};

type AppIntroductions = {
  id: string;
  title: string;
  summary: string;
  images: Image[];
  createdAt: Date;
};

type Image = {
  imageURL: string;
  imageALT: string;
};

const NewAppsList: React.FC<NewAppsListProps> = ({ appIntroductions }) => {
  const sortedIntroductions = appIntroductions.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
  const latestSixAppIntroductions = sortedIntroductions.slice(0, 10);

  return (
    <TopPageSection>
      <h2 className="h2 text-center">新着のアプリ</h2>
      <div className="flex flex-wrap">
        {latestSixAppIntroductions.map((appIntroduction) => {
          const firstImage = appIntroduction.images[0];
          return (
            <div
              key={appIntroduction.id}
              className="flex flex-col items-center justify-center min-w-[200px] min-h-[200px] mx-2 my-6 text-center"
            >
              <Link href={`/app/${appIntroduction.id}`}>
                <Image
                  src={firstImage?.imageURL || "/test.JPG"}
                  width={200}
                  height={200}
                  alt={firstImage?.imageALT || "test"}
                  className="border border-gray-400 "
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
    </TopPageSection>
  );
};

export default NewAppsList;
