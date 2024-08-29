import { addAppIntroduction } from "@/app/action/ActionAppIntroduction";
import FormAppIntroduction from "@/app/components/dashboard/FormAppIntroduction";
import FormProfile from "@/app/components/dashboard/FormProfile";
import Profile from "@/app/components/Profile";
import Modal from "@/app/components/ui/Modal";
import UserAppsList from "@/app/components/UserAppsList";
import { getSessionUser } from "@/app/lib/SessionUserService";


const page = async () => {
  const userData = await getSessionUser();

  if (!userData || !userData.profile) {
    return null;
  }

  return (
    <>
      <h1 className="h1">プロフィール</h1>
      <Profile userName={userData.name} profile={userData.profile} />
      <Modal buttonColor="blue" buttonText="プロフィールの変更">
        <FormProfile userId={userData.id} profile={userData.profile} />
      </Modal>
      <h2 className="h2">登録しているアプリの一覧</h2>
      <UserAppsList
        appIntroductions={userData.appIntroductions}
        editButton={true}
      />
      <Modal buttonColor="blue" buttonText="アプリの登録">
        <FormAppIntroduction
          formAction={addAppIntroduction}
          formName="アプリの登録"
          userId={userData.id}
        />
      </Modal>
    </>
  );
};

export default page;
