import Image from "next/image";

type BlogTopInfoProps = {
  title: string;
  src: string;
  alt: string;
  date: string;
};

const BlogTopInfo: React.FC<BlogTopInfoProps> = ({ title, src, alt, date }) => {
  return (
    <>
      <h1 className="h1">{title}</h1>
      <Image src={src} alt={alt} width={800} height={530} className="mx-auto" />
      <p className="mt-2 mb-4 font-semibold text-right">作成日：{date}</p>
    </>
  );
};

export default BlogTopInfo;
