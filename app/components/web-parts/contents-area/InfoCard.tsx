import Image from "next/image";
import Link from "next/link";

type InfoCardProps = {
  title: string;
  content: string;
  linkURL?: string;
  src?: string | undefined;
  alt?: string | undefined;
};

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  content,
  linkURL,
  src,
  alt,
}) => {
  const cardContent = (
    <div className="flex flex-col md:flex-row items-center justify-center w-full p-6 border rounded shadow-xl bg-gray-600">
      <div className="w-full md:w-[70%] my-auto md:pr-8">
        <p className="text-white text-2xl md:text-3xl mt-2 mb-8">{title}</p>
        <p className="text-white md:text-lg">{content}</p>
      </div>
      <div className="w-full md:w-[30%] flex items-center justify-center mt-8 md:mt-0">
        <Image
          src={src ? src : "/test.JPG"}
          width={250}
          height={150}
          alt={alt ? alt : "画像が登録されていません"}
        />
      </div>
    </div>
  );

  return linkURL ? <Link href={linkURL}>{cardContent}</Link> : cardContent;
};

export default InfoCard;
