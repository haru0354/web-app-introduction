import Profile from "@/app/components/Profile";
import UserAppsList from "@/app/components/UserAppsList";
import { getUser } from "@/app/lib/UserService";
import NotFound from "@/app/not-found";

const page = async ({ params }: { params: { userId: string } }) => {
  const userId = params.userId;
  const user = await getUser(userId);

  if(!user) {
    return <NotFound />
  }

  return (
    <>
      <h1 className="h1">プロフィール</h1>
      <Profile userName={user.name} profile={user.profile} />
      <h2 className="h2">登録されてるアプリの一覧</h2>
      <UserAppsList appIntroductions={user.appIntroductions} />
    </>
  );
};

export default page;
