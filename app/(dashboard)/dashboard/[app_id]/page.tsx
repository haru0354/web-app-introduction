import { updateAppIntroduction } from "@/app/action/ActionAppIntroduction";
import FormAppIntroduction from "@/app/components/dashboard/FormAppIntroduction";
import prisma from "@/app/lib/prisma";

const page = async ({ params }: { params: { app_id: string } }) => {
  const id = params.app_id;
  const appIntroductionData = await prisma.appIntroduction.findUnique({
    where: {
      id,
    },
  });

  return (
    <>
      <div className="p-4 border border-gray-700 rounded">
        <FormAppIntroduction
          formName="編集フォーム"
          appIntroductionData={appIntroductionData}
          formAction={updateAppIntroduction}
          appId={id}
        />
      </div>
    </>
  );
};

export default page;
