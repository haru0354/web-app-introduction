import Image from "next/image";

type TwoColumnImageAndTextProps = {
  contents: string[];
  src: string;
  alt: string;
  reverse?: boolean;
};

const TwoColumnImageAndText: React.FC<TwoColumnImageAndTextProps> = ({
  contents,
  src,
  alt,
  reverse = false,
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row items-center justify-center w-full md:px-16 my-8 ${
        reverse && "flex-row-reverse"
      }`}
    >
      <div className="w-[280px]">
        <Image src={src} width={280} height={180} alt={alt} />
      </div>
      <div className="min-w-[280px] w-full my-auto py-4 md:py-6 md:px-12">
        {contents.map((content, index) => {
          return <p key={index}>{content}</p>;
        })}
      </div>
    </div>
  );
};

export default TwoColumnImageAndText;
