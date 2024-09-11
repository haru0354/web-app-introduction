import Profile from "@/app/components/web-parts/contents-area/Profile";
import AppsList from "@/app/components/web-parts/contents-area/AppsList";
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
      <Profile userName={user.name} profile={user.profile} />
      <AppsList appIntroductions={user.appIntroductions} />
    </>
  );
};

export default page;
