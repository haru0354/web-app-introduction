import Link from "next/link";
import NewAppsList from "./components/topPage/NewAppsList";
import { getAllAppIntroductions } from "./lib/AppIntroductionService";

export default async function Home() {
  const appIntroductions = await getAllAppIntroductions();
console.log(appIntroductions);

  if (!appIntroductions) {
    return null;
  }

  return (
    <main className="w-full max-w-[1140px] mx-auto my-12 px-2">
      <NewAppsList appIntroductions={appIntroductions} />
      <ul>
        <li>
          <Link href="/dashboard">ダッシュボード</Link>
        </li>
        <li>
          <Link href="/user">登録しているユーザー一覧</Link>
        </li>
        <li>
          <Link href="/app">登録されてるアプリ一覧</Link>
        </li>
      </ul>
    </main>
  );
}
