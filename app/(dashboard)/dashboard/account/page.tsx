import { Metadata } from "next";
import Link from "next/link";

import { getSessionUserAccount } from "@/app/lib/service/sessionUserService";
import Modal from "@/app/components/web-parts/Modal";
import DeleteAccountModal from "@/app/components/web-parts/dashboard/DeleteAccountModal";
import FormEmail from "@/app/components/form/FormEmail";
import FormUpdatePassword from "@/app/components/form/FormUpdatePassword";
import Button from "@/app/components/ui/button/Button";

export const metadata: Metadata = {
  title: "アカウントデータの変更",
  description: "このページはアカウントデータの変更ページです。登録をしたメールアドレスの変更・パスワードの変更・アカウントの削除をすることができます。",
};

const page = async () => {
  const userData = await getSessionUserAccount();

  if (!userData) {
    return null;
  }

  return (
    <>
      <h1 className="h1 text-center">アカウントデータの変更</h1>
      <div className="text-center p-4 mx-2 md:mx-16 border border-customBlack border-dashed">
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
      <h2 className="h2 text-center">メールアドレスの変更</h2>
      <p className="text-center">
        登録しているメールアドレスの変更をすることができます。
      </p>
      <p className="text-center">
        メールアドレスの変更が完了すると「ログアウト」が行われます。
      </p>
      <p className="text-center">
        ログイン時には新しく登録したメールアドレスを使用してください。
      </p>
      <Modal buttonText="メールアドレスの変更">
        <FormEmail
          userId={userData.user.id}
          email={userData.user.email || undefined}
        />
      </Modal>
      <h2 className="h2 text-center">パスワードの変更</h2>
      <p className="text-center">
        登録しているパスワードの変更の変更をすることができます。
      </p>
      <p className="text-center">
        パスワードの変更が完了すると「ログアウト」が行われます。
      </p>
      <p className="text-center">
        ログイン時には新しく登録したパスワードを使用してください。
      </p>
      <Modal buttonText="パスワードの変更">
        <FormUpdatePassword userId={userData.user.id} />
      </Modal>
      <h2 className="h2 text-center">アカウントの削除</h2>
      <p className="text-center">
        登録しているアカウントの削除をすることができます。
      </p>
      <p className="text-center">
        アカウントの削除をすることで「登録しているアプリデータ」「アカウントデータ」が削除されます。
      </p>
      <p className="text-center">
        削除をするとデータの復元をすることはできません。
      </p>
      <p className="text-center">
        なお、再度アカウントを作成しなおすことはできます。
      </p>
      <DeleteAccountModal userId={userData.user.id} />
    </>
  );
};

export default page;
