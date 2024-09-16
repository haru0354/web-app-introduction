
import FormEmail from "@/app/components/form/FormEmail";
import FormUpdatePassword from "@/app/components/form/FormUpdatePassword";
import Button from "@/app/components/ui/Button";
import DeleteAccountModal from "@/app/components/web-parts/dashboard/DeleteAccountModal";
import Modal from "@/app/components/web-parts/Modal";
import { getSessionUserAccount } from "@/app/lib/sessionUserService";
import Link from "next/link";

const page = async () => {
  const userData = await getSessionUserAccount();

  if (!userData) {
    return null;
  }

  return (
    <>
      <h1 className="h1 text-center">アカウントデータの変更</h1>
      <div className="text-center p-4 mx-2 md:mx-16 border border-gray-700 border-dashed">
        <p>
          このページでは登録しているアカウントデータの変更をすることができます。
        </p>
        <p>
          データの変更時には確認の為、登録しているパスワードの入力が必要となります。
        </p>
        <p>
          データ変更後は自動的に「ログアウト」が行われ、TOPページに移動します。
        </p>
      </div>
      <Link href="/dashboard">
        <Button color="blue" className="block mx-auto">
          ダッシュボードへ戻る
        </Button>
      </Link>
      <h2 className="h2">メールアドレスの変更</h2>
      <Modal buttonText="メールアドレスの変更">
        <FormEmail
          userId={userData.user.id}
          email={userData.user.email || undefined}
        />
      </Modal>
      <h2 className="h2">パスワードの変更</h2>
      <Modal buttonText="パスワードの変更">
        <FormUpdatePassword userId={userData.user.id} />
      </Modal>
      <h2 className="h2">アカウントの削除00</h2>
      <DeleteAccountModal userId={userData.user.id} />

    </>
  );
};

export default page;
