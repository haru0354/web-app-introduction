import { addAppIntroduction } from "@/app/api/action/ActionAppIntroduction";
import FormAppIntroduction from "@/app/components/dashboard/FormAppIntroduction";
import Button from "@/app/components/ui/Button";
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
          formAction={addAppIntroduction}
        />
      </div>
    </>
  );
};

export default page;
