import { Metadata } from "next";

import { getSessionUserAccount } from "@/app/lib/service/sessionUserService";
import Modal from "@/app/components/web-parts/Modal";
import DeleteAccountModal from "@/app/components/web-parts/dashboard/DeleteAccountModal";
import FormEmail from "@/app/components/form/FormEmail";
import FormUpdatePassword from "@/app/components/form/FormUpdatePassword";
import NextLinkButton from "@/app/components/ui/button/NextLinkButton";

export const metadata: Metadata = {
  title: "アカウントデータの変更",
  description:
    "このページはアカウントデータの変更ページです。登録をしたメールアドレスの変更・パスワードの変更・アカウントの削除をすることができます。",
};

const page = async () => {
  const userData = await getSessionUserAccount();

  if (!userData) {
    return null;
  }

  return (
    <>
      <h1 className="h1 text-center">アカウントデータの変更</h1>
      <div className="max-w-[680px] md:mx-auto mx-4 p-4 text-center border shadow-md border-gray-300 border-dashed">
        <p>このページではアカウントデータの変更が可能です。</p>
        <p>
          各種データの変更には確認の為「登録しているパスワードの入力が必要」となります。
        </p>
        <p>
          データ変更後は自動的に「ログアウト」が行われ、TOPページに移動します。
        </p>
        <div className="flex items-center justify-center">
          <NextLinkButton href="/dashboard" color="blue" className="rounded">
            ダッシュボードへ戻る
          </NextLinkButton>
        </div>
      </div>
      <div className="flex-raw md:flex my-8">
        <div className="m-4 p-4 border rounded border-dashed shadow-md border-gray-300">
          <h2 className="pb-2 mb-4 text-center font-semibold text-xl border-b border-dashed border-gray-300">
            メールアドレスの変更
          </h2>
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
        </div>
        <div className="m-4 p-4 border rounded border-dashed shadow-md border-gray-300">
          <h2 className="pb-2 mb-4 text-center font-semibold text-xl border-b border-dashed border-gray-300">
            パスワードの変更
          </h2>
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
        </div>
      </div>
      <div className="m-4 p-4 border rounded border-dashed shadow-md border-red-300">
        <h2 className="pb-2 mb-4 text-center font-semibold text-xl border-b border-dashed border-red-300">
          アカウントの削除
        </h2>
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
      </div>
    </>
  );
};

export default page;
