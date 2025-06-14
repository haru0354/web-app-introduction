import { Metadata } from "next";

import { getSessionUserId } from "@/app/lib/service/sessionUserService";
import {
  deleteAppIntroduction,
  updateAppIntroduction,
} from "@/app/action/actionAppIntroduction";
import prisma from "@/app/lib/prisma";
import FormAppIntroduction from "@/app/components/form/FormAppIntroduction";
import Modal from "@/app/components/web-parts/Modal";
import Button from "@/app/components/ui/button/Button";
import NotFound from "@/app/not-found";

export const metadata: Metadata = {
  title: "アプリの編集",
  description: "このページはアプリの編集ページです。登録をした自作WEBアプリの情報の編集、及び、データの削除を行うことができます。",
};

const page = async ({ params }: { params: { app_id: string } }) => {
  const id = params.app_id;
  const userId = await getSessionUserId();

  if (!userId) {
    return null;
  }

  const appIntroductionData = await prisma.appIntroduction.findUnique({
    where: {
      id,
    },
  });

  if (!appIntroductionData) {
    return <NotFound />;
  }

  return (
    <>
      <h2 className="h1 text-center">アプリの編集</h2>
      <div className="mx-auto max-w-[760px] p-4 border border-customBlack rounded">
        <FormAppIntroduction
          formName="編集フォーム"
          appIntroductionData={appIntroductionData}
          formAction={updateAppIntroduction}
          appId={id}
          backButton={true}
          userId={userId}
        />
      </div>
      <h2 className="h2 text-center">アプリの削除</h2>
      <Modal buttonText="削除" buttonColor="red">
        <p className="text-center">
          登録したアプリ「{appIntroductionData?.title}」を削除しますか？
        </p>
        <p className="text-center">
          削除すると復元することはできなくなります。
        </p>
        <form action={deleteAppIntroduction}>
          <input type="hidden" name="appId" value={id} />
          <input type="hidden" name="userId" value={userId} />
          <Button type="submit" color="red" size="normal" className="block mx-auto rounded">
            削除
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default page;
