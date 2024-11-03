import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-2xl text-center py-8 text-customBlack font-bold">
        404NotFound
      </h1>
      <p className="text-center">指定されたページは存在しません。</p>
      <p className="text-center">URLの誤りまたは削除された可能性があります。</p>
      <Link href="/" className="text-sky-500">
        TOPページへ
      </Link>
    </div>
  );
};

export default NotFound;
