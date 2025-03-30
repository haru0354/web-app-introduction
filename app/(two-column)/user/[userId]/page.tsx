import { Metadata } from "next";

import { getUser } from "@/app/lib/service/userService";
import Profile from "@/app/components/web-parts/contents-area/Profile";
import AppsList from "@/app/components/web-parts/contents-area/AppsList";
import NotFound from "@/app/not-found";

export const generateMetadata = async ({
  params,
}: {
  params: { userId: string };
}): Promise<Metadata> => {
  const userId = params.userId;
  const user = await getUser(userId);

  if (!user) {
    return {
      title: "404NotFound",
      description: "指定されたページは存在しません。URLの誤りまたは削除された可能性があります。",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: user.name || "ユーザープロフィール",
    description: "ユーザープロフィールページです。登録しているユーザーのプロフィールやWEBアプリの一覧を閲覧をすることができるようになっています。",
  };
};

const page = async ({ params }: { params: { userId: string } }) => {
  const userId = params.userId;
  const user = await getUser(userId);

  if(!user) {
    return <NotFound />
  }

  return (
    <>
      <Profile userName={user.name} profile={user.profile} />
      <AppsList appIntroductions={user.appIntroductions} />
    </>
  );
};

export default page;
