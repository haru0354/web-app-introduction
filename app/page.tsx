import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row justify-between w-full max-w-[1140px] mx-auto">
      <div className="w-full max-w-[800px] px-2">
        <ul>
          <li><Link href="/dashboard">ダッシュボード</Link></li>
          <li><Link href="/user">登録しているユーザー一覧</Link></li>
          <li><Link href="/app">登録されてるアプリ一覧</Link></li>
        </ul>
      </div>
      <div className="w-full max-w-[300px] px-2">side</div>
    </main>
  );
}
