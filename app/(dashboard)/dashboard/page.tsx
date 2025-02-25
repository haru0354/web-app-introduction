import { Metadata } from "next";
import Link from "next/link";

import { getSessionUser } from "@/app/lib/sessionUserService";
import { addAppIntroduction } from "@/app/action/actionAppIntroduction";
import Modal from "@/app/components/web-parts/Modal";
import FormAppIntroduction from "@/app/components/form/FormAppIntroduction";
import FormProfile from "@/app/components/form/FormProfile";
import Profile from "@/app/components/web-parts/contents-area/Profile";
import AppsList from "@/app/components/web-parts/contents-area/AppsList";
import Button from "@/app/components/ui/Button";

export const metadata: Metadata = {
  title: "ダッシュボード",
  description: "このページはアダッシュボードページです。登録をした自作WEBアプリの登録・編集・削除の他、プロフィールの追加・編集やアカウントの編集・削除をすることができます。",
  robots: {
    index: false,
    follow: false,
  },
};

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
      <h2 className="h2">登録しているアプリ一覧</h2>
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
      <h2 className="h2">アカウントデータの変更</h2>
      <p className="text-center">
        下記のアカウントデータの変更はアカウントデータページにて行えます。
      </p>
      <ul className="list-disc w-full max-w-[400px] mx-auto my-4 px-12 py-4 border border-customBlack border-dashed">
        <li className="my-2">メールアドレスの変更</li>
        <li className="my-2">パスワードの変更</li>
        <li className="my-2">アカウントの削除</li>
      </ul>
      <p className="text-center">
        これらを変更するには下記ボタンよりアカウントデータページへお進みください。
      </p>
      <Link href="/dashboard/account">
        <Button color="blue" className="block mx-auto">
          アカウントデータの変更
        </Button>
      </Link>
    </>
  );
};

export default page;
