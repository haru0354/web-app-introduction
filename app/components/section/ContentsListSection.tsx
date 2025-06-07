import Link from "next/link";
import Image from "next/image";

import TopPageSection from "../layouts/TopPageSection";

type ContentsListSectionProps = {
  contents: Contents[];
  listTitle: string;
};

type Contents = {
  title: string;
  url: string;
  imageSrc: string;
  imageAlt: string;
};

const ContentsListSection: React.FC<ContentsListSectionProps> = ({
  contents,
  listTitle,
}) => {
  if (
    !contents ||
    contents.length === 0 ||
    contents.every((content) => !content.title)
  ) {
    return null;
  }

  return (
    <TopPageSection>
      <h2 className="text-center text-3xl font-bold my-8">{listTitle}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-2">
        {contents.map((content) => {
          return (
            <Link href={content.url} key={content.url}>
              <div className="flex flex-col items-center justify-center text-center hover:-translate-y-2 transition">
                <Image
                  src={content.imageSrc}
                  width={340}
                  height={230}
                  alt={content.imageAlt}
                  className="border border-gray-400"
                />
                <h3 className="my-3 font-semibold text-gray-600 ">
                  {content.title}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </TopPageSection>
  );
};

export default ContentsListSection;
