import Image from "next/image";
import Link from "next/link";

import NextLinkButton from "../../ui/button/NextLinkButton";

import type { AppIntroduction } from "@prisma/client";

type AppsListProps = {
  appIntroductions: AppIntroduction[];
  oneColumn?: boolean;
  editButton?: boolean;
};

const AppsList: React.FC<AppsListProps> = ({
  appIntroductions,
  oneColumn = false,
  editButton = false,
}) => {
  if (!appIntroductions) {
    return null;
  }

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${
        oneColumn ? "lg:grid-cols-5" : "lg:grid-cols-4"
      } gap-6 w-full`}
    >
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
          <div className="flex flex-col justify-between">
            <Link href={`/app/${appIntroduction.id}`}>
              <div
                key={appIntroduction.id}
                className="flex flex-col items-center text-center  hover:-translate-y-2 transition"
              >
                <Image
                  src={firstImage?.imageURL || "/test.JPG"}
                  width={200}
                  height={200}
                  alt={firstImage?.imageALT || "test"}
                  className="border rounded border-gray-400"
                />
                <h2 className="font-semibold text-gray-600 mt-3">{title}</h2>「
                {summary}」
              </div>
            </Link>
            {editButton && (
              <div className="flex items-center justify-center">
                <NextLinkButton
                  href={`/dashboard/${appIntroduction.id}`}
                  color="gray"
                  size="normal"
                  className="rounded"
                >
                  編集
                </NextLinkButton>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AppsList;
