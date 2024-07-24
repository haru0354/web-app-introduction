import Profile from "@/app/components/Profile";
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
    </>
  );
};

export default page;
