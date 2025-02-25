import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { getAllUser } from "@/app/lib/userService";

export const metadata: Metadata = {
  title: "ユーザーの一覧",
  description: "このページはWEBアプリを登録しているユーザーの一覧ページです。様々なWEBアプリの製作者を見つけることができるようになっています。",
  robots: {
    index: false,
  },
};

const page = async () => {
  const allUser = await getAllUser();

  if (!allUser) {
    return null;
  }

  return (
    <>
      <h1 className="h1">WEBアプリを登録しているユーザーの一覧</h1>
      <div className="flex flex-wrap w-full">
        {allUser.map((user) => (
          <div
            key={user.id}
            className="flex flex-col items-center justify-center w-full max-w-[120px] text-center mx-4"
          >
            <Link href={`/user/${user.id}`}>
              <Image
                src={user.image ? user.image : "/test.jpg"}
                width={120}
                height={120}
                alt="ユーザーの画像"
                className="rounded-full hover:-translate-y-2 transition"
              />
            </Link>
            <p>「{user.name ? user.name : "名無し"}」</p>
            {user.profile?.occupation && <p>{user.profile.occupation}</p>}
            {user.profile?.skill && <p>{user.profile.skill}</p>}
          </div>
        ))}
      </div>
    </>
  );
};

export default page;
