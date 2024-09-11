import Image from "next/image";
import Link from "next/link";
import Button from "../../ui/Button";

type AppsListProps = {
  appIntroductions: AppIntroductions[];
  editButton?: boolean;
};

type AppIntroductions = {
  id: string;
  title: string;
  summary: string;
  images: Image[];
};

type Image = {
  imageURL: string;
  imageALT: string;
};

const AppsList: React.FC<AppsListProps> = ({
  appIntroductions,
  editButton = false,
}) => {
  if (!appIntroductions) {
    return null;
  }

  return (
    <div className="flex flex-wrap w-full max-w-[1140px]">
      <h2 className="h2">登録しているアプリの一覧</h2>
      {appIntroductions.map((appIntroduction) => {
        const firstImage = appIntroduction.images[0];
        return (
          <>
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
                  className="border border-gray-400 hover:-translate-y-2 transition"
                />
              </Link>
              <h2 className="text-gray-600 font-semibold">
                {appIntroduction.title}
              </h2>
              {appIntroduction.summary}
              {editButton && (
                <Link href={`/dashboard/${appIntroduction.id}`}>
                  <Button color="gray" size="normal">
                    編集
                  </Button>
                </Link>
              )}
            </div>
          </>
        );
      })}
    </div>
  );
};

export default AppsList;
