import Image from "next/image";
import Link from "next/link";
import TopPageSection from "../layouts/with-children/TopPageSection";

type NewAppsListInfoProps = {
  appIntroductions: AppIntroductions[];
};

type AppIntroductions = {
  id: string;
  title: string;
  overview: string;
  images: Image[];
  createdAt: Date;
};

type Image = {
  imageURL: string;
  imageALT: string;
};

const NewAppsListInfo: React.FC<NewAppsListInfoProps> = ({
  appIntroductions,
}) => {
  const sortedIntroductions = appIntroductions.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
  const latestSixAppIntroductions = sortedIntroductions.slice(0, 10);

  return (
    <TopPageSection>
      <h2 className="text-center text-3xl font-bold my-8">新着アプリ</h2>
      <div className="flex flex-col">
        {latestSixAppIntroductions.map((appIntroduction, index) => {
          const firstImage = appIntroduction.images[0];
          const overview =
            appIntroduction.overview.length > 120
              ? appIntroduction.overview.substring(0, 117) + "..."
              : appIntroduction.overview;
          return (
            <Link href={`/app/${appIntroduction.id}`} key={appIntroduction.id}>
              <div
                className={`flex flex-col md:flex-row items-center justify-center w-full pt-8 md:py-1 border-b border-dashed border-gray-700 hover:bg-blue-100 ${
                  index === 0 && "border-t border-dashed border-gray-700"
                }`}
              >
                <div className="min-w-[200px] mx-2">
                  <Image
                    src={firstImage?.imageURL || "/test.JPG"}
                    width={200}
                    height={200}
                    alt={firstImage?.imageALT || "test"}
                    className="border border-gray-400"
                  />
                </div>
                <div className="w-full p-8">
                  <h2 className="text-xl font-semibold text-gray-600 mb-4 md:mb-8">
                    {appIntroduction.title}
                  </h2>
                  {overview}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </TopPageSection>
  );
};

export default NewAppsListInfo;
