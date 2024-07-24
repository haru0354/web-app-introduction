import Profile from "@/app/components/Profile";
import UserAppsList from "@/app/components/UserAppsList";
import { user } from "@/seeds/user";
import React from "react";

const page = () => {
  return (
    <>
      <h1 className="h1">プロフィール</h1>
      <Profile
        userName={user.name}
        profile={user.profile}
      />
      <h2 className="h2">登録しているアプリの一覧</h2>
      <UserAppsList appIntroductions={user.appIntroductions} />
    </>
  );
};

export default page;
