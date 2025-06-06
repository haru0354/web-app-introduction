import { Metadata } from "next";
import { redirect } from "next/navigation";

import { getSessionUserId } from "@/app/lib/service/sessionUserService";
import { signUp } from "@/app/action/actionUser";
import FormSignUp from "@/app/components/form/FormSignUp";

export const metadata: Metadata = {
  title: "アカウントの登録",
  description: "このページはアカウントの登録ページです。アカウントの登録をすることによって、自作したWEBアプリの掲載をすることができるようになります。ア",
  robots: {
    index: false, 
  },
};

const page = async () => {
  const userId = await getSessionUserId()

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="w-full max-w-[400px] p-4 mx-auto border rounded border-gray-400 bg-white">
      <FormSignUp formAction={signUp} />
    </div>
  );
};

export default page;
