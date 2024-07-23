import {
  deleteAppIntroduction,
  updateAppIntroduction,
} from "@/app/action/ActionAppIntroduction";
import FormAppIntroduction from "@/app/components/dashboard/FormAppIntroduction";
import Button from "@/app/components/ui/Button";
import Modal from "@/app/components/ui/Modal";
import prisma from "@/app/lib/prisma";
import NotFound from "@/app/not-found";

const page = async ({ params }: { params: { app_id: string } }) => {
  const id = params.app_id;
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
      <h2>アプリの編集</h2>
      <div className="mx-auto p-4 border border-gray-700 rounded">
        <FormAppIntroduction
          formName="編集フォーム"
          appIntroductionData={appIntroductionData}
          formAction={updateAppIntroduction}
          appId={id}
        />
      </div>
      <h2>アプリの削除</h2>
      <Modal buttonText="削除" buttonColor="red">
        <p className="text-center">
          登録したアプリ「{appIntroductionData?.title}」を削除しますか？
        </p>
        <p className="text-center">
          削除すると復元することはできなくなります。
        </p>
        <form action={deleteAppIntroduction}>
          <input type="hidden" name="appId" value={id} />
          <Button color="red" size="normal" className="block mx-auto ">
            削除
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default page;
