import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { getAllUser } from "@/app/lib/service/userService";

export const metadata: Metadata = {
  title: "ユーザーの一覧",
  description:
    "このページはWEBアプリを登録しているユーザーの一覧ページです。様々なWEBアプリの製作者を見つけることができるようになっています。",
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
      <h1 className="h1">ユーザーの一覧</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full">
        {allUser.map((user) => (
          <Link href={`/user/${user.id}`} key={user.id}>
            <div className="flex flex-col items-center justify-center w-full max-w-[120px] text-center mx-4 hover:-translate-y-2 transition">
              <Image
                src={user.image ? user.image : "/test.jpg"}
                width={120}
                height={120}
                alt="ユーザーの画像"
                className="rounded-full "
              />
              <p>「{user.name ? user.name : "名無し"}」</p>
              {user.profile?.occupation && <p>{user.profile.occupation}</p>}
              {user.profile?.skill && <p>{user.profile.skill}</p>}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default page;
