import { Metadata } from "next";

import { getAllAppIntroductions } from "@/app/lib/service/appIntroductionService";
import AppsList from "@/app/components/web-parts/contents-area/AppsList";

export const metadata: Metadata = {
  title: "WEBアプリの一覧",
  description: "このページはWEBアプリの一覧ページです。様々なWEBアプリを見つけることができるようになっています。また、自作したwebアプリを登録して表示をすることも可能となっています。便利なアプリを探している方はご覧ください。",
};

const page = async () => {
  const allAppIntroductions = await getAllAppIntroductions();

  if (!allAppIntroductions) {
    return null;
  }

  return (
    <>
      <h1 className="h1">WEBアプリの一覧ページ</h1>
      <AppsList appIntroductions={allAppIntroductions} />
    </>
  );
};

export default page;
