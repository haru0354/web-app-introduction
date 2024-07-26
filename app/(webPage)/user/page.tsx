import { users } from "@/seeds/users";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <>
      <h1 className="h1">WEBアプリを登録しているユーザーの一覧</h1>
      <div className="flex flex-wrap w-full">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex flex-col items-center justify-center w-full max-w-[120px] text-center mx-4"
          >
            <Link href={`/user/${user.id}`}>
              <Image
                src={user.image}
                width={120}
                height={120}
                alt="ユーザーの画像"
                className="rounded-full hover:-translate-y-2 transition"
              />
            </Link>
            <p>{user.name}</p>
            <p>{user.profile.occupation}</p>
            <p>{user.profile.skill}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default page;
