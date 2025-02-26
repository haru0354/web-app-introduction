import Image from "next/image";
import Link from "next/link";

import Button from "../../ui/Button";

import type { AppIntroduction } from "@prisma/client";

type AppsListProps = {
  appIntroductions: AppIntroduction[];
  editButton?: boolean;
};

const AppsList: React.FC<AppsListProps> = ({
  appIntroductions,
  editButton = false,
}) => {
  if (!appIntroductions) {
    return null;
  }

  return (
    <div className="flex flex-wrap w-full">
      {appIntroductions.map((appIntroduction) => {
        const firstImage = appIntroduction.images[0];
        const title =
          appIntroduction.title.length > 11
            ? appIntroduction.title.slice(0, 11) + "..."
            : appIntroduction.title;
        const summary =
          appIntroduction.summary.length > 11
            ? appIntroduction.summary.slice(0, 11) + "..."
            : appIntroduction.summary;
        return (
          <div
            key={appIntroduction.id}
            className="flex flex-col items-center min-w-[200px] mx-2 my-6 text-center"
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
            <h2 className="font-semibold text-gray-600 mt-3">{title}</h2>「
            {summary}」
            {editButton && (
              <Link href={`/dashboard/${appIntroduction.id}`}>
                <Button color="gray" size="normal">
                  編集
                </Button>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AppsList;
