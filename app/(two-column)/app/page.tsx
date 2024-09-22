import { getAllAppIntroductions } from "@/app/lib/appIntroductionService";
import AppsList from "@/app/components/web-parts/contents-area/AppsList";

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
