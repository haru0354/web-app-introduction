import Image from "next/image";

type TwoColumnImageAndTextProps = {
  title: string;
  contents: string[];
  src: string;
  alt: string;
};

const TwoColumnImageAndText: React.FC<TwoColumnImageAndTextProps> = ({
  title,
  contents,
  src,
  alt,
}) => {
  return (
    <>
      <h3 className="h3">{title}</h3>
      <div className="flex flex-wrap items-center justify-center w-full px-16 my-8">
        <div className="w-[280px]">
          <Image src={src} width={280} height={180} alt={alt} />
        </div>
        <div className="flex-grow my-auto p-4">
          {contents.map((content, index) => {
            return <p key={index}>{content}</p>;
          })}
        </div>
      </div>
    </>
  );
};

export default TwoColumnImageAndText;
