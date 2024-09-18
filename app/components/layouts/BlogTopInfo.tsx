import Image from "next/image";

type BlogTopInfoProps = {
  title: string;
  date: string;
  src?: string;
  alt?: string;
  image?: boolean;
};

const BlogTopInfo: React.FC<BlogTopInfoProps> = ({
  title,
  date,
  src,
  alt,
  image = true,
}) => {
  return (
    <>
      <h1 className="h1">{title}</h1>
      {image && src && alt && (
        <Image
          src={src}
          alt={alt}
          width={800}
          height={530}
          className="mx-auto"
        />
      )}
      <p className="mt-2 mb-4 font-semibold text-right">作成日：{date}</p>
    </>
  );
};

export default BlogTopInfo;
