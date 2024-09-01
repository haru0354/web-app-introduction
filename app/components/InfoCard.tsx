import Image from "next/image";

type InfoCardProps = {
  title: string;
  content: string;
  src: string;
  alt: string;
};

const InfoCard: React.FC<InfoCardProps> = ({ title, content, src, alt }) => {
  return (
      <div className="flex flex-col md:flex-row items-center justify-center w-full p-6 border rounded bg-gray-600">
        <div className="w-full md:w-[70%] my-auto md:pr-8">
          <p className="text-white text-2xl md:text-3xl mt-2 mb-8">{title}</p>
          <p className="text-white md:text-lg">{content}</p>
        </div>
        <div className="w-full md:w-[30%] flex items-center justify-center mt-8 md:mt-0">
          <Image src={src} width={250} height={150} alt={alt} />
        </div>
      </div>
  );
};

export default InfoCard;
