import Link from "next/link";
import Image from "next/image";
import TopPageSection from "../layouts/with-children/TopPageSection";

type ArticlesListSectionProps = {
  articles?: Articles[];
  articlesListTitle: string;
};

type Articles = {
  title: string;
  url: string;
  imageSrc: string;
  imageAlt: string;
};

const ArticlesListSection: React.FC<ArticlesListSectionProps> = ({
  articles,
  articlesListTitle,
}) => {
  if (!articles || articles.length === 0 || articles.every(article => !article.title)) {
    return null;
  }

  return (
    <TopPageSection>
      <h2 className="text-center text-3xl font-bold my-8">
        {articlesListTitle}
      </h2>
      <div className="flex items-center justify-center">
        {articles.map((article, index) => {
          return (
            <div key={index} className="flex flex-col items-center justify-center min-w-[200px] min-h-[200px] mx-2 my-6 text-center">
              <Link href={article.url}>
                <Image
                  src={article.imageSrc}
                  width={360}
                  height={240}
                  alt={article.imageAlt}
                  className="border border-gray-400 hover:-translate-y-2 transition"
                />
              </Link>
              <h3 className="my-3 text-gray-600 font-semibold">
                <Link href={article.url}>{article.title}</Link>
              </h3>
            </div>
          );
        })}
      </div>
    </TopPageSection>
  );
};

export default ArticlesListSection;
