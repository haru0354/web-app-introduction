import { addAppIntroduction } from "@/app/action/ActionAppIntroduction";
import FormAppIntroduction from "@/app/components/form/FormAppIntroduction";
import FormProfile from "@/app/components/form/FormProfile";
import Modal from "@/app/components/web-parts/Modal";
import Profile from "@/app/components/web-parts/contents-area/Profile";
import AppsList from "@/app/components/web-parts/contents-area/AppsList";
import { getSessionUser } from "@/app/lib/SessionUserService";

const page = async () => {
  const userData = await getSessionUser();

  if (!userData || !userData.profile) {
    return null;
  }

  return (
    <>
      <Profile userName={userData.name} profile={userData.profile} />
      <Modal buttonColor="blue" buttonText="プロフィールの変更">
        <FormProfile userId={userData.id} profile={userData.profile} />
      </Modal>
      <AppsList
        appIntroductions={userData.appIntroductions}
        editButton={true}
      />
      <Modal buttonColor="blue" buttonText="アプリの登録">
        <FormAppIntroduction
          formAction={addAppIntroduction}
          formName="アプリの登録"
          userId={userData.id}
          isModalPage={true}
        />
      </Modal>
    </>
  );
};

export default page;
