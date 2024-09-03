import Link from "next/link";
import Image from "next/image";
import TopPageSection from "../layouts/with-children/TopPageSection";

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
  if (!contents || contents.length === 0 || contents.every(content => !content.title)) {
    return null;
  }

  return (
    <TopPageSection>
      <h2 className="text-center text-3xl font-bold my-8">
        {listTitle}
      </h2>
      <div className="flex items-center justify-center">
        {contents.map((content, index) => {
          return (
            <div key={index} className="flex flex-col items-center justify-center min-w-[200px] min-h-[200px] mx-2 my-6 text-center">
              <Link href={content.url}>
                <Image
                  src={content.imageSrc}
                  width={360}
                  height={240}
                  alt={content.imageAlt}
                  className="border border-gray-400 hover:-translate-y-2 transition"
                />
              </Link>
              <h3 className="my-3 text-gray-600 font-semibold">
                <Link href={content.url}>{content.title}</Link>
              </h3>
            </div>
          );
        })}
      </div>
    </TopPageSection>
  );
};

export default ContentsListSection;
