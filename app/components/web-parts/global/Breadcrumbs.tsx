"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Breadcrumbs = () => {
  const pathname = usePathname();

  const getBreadcrumb = (path: string) => {
    if (path.startsWith("/app/")) {
      return {
        label: "WEBアプリ一覧",
        href: "/app",
      };
    } else if (path.startsWith("/dashboard/")) {
      return {
        label: "ダッシュボード",
        href: "/dashboard",
      };
    } else if (path.startsWith("/user/")) {
      return {
        label: "ユーザーの一覧",
        href: "/user",
      };
    } else {
      return {
        label: "",
        href: "",
      };
    }
  };

  const breadcrumb = getBreadcrumb(pathname);

  return (
    <div className="w-full text-sm my-2">
      <nav>
        <ol className="flex text-gray-500">
          <li>
            <Image
              src="/home_image.png"
              alt="home"
              width={20}
              height={20}
              className="inline mr-2"
            />
            <Link href="/" className="text-sky-600">
              ホーム
            </Link>
            <span className="mx-2"> &gt; </span>
          </li>
          {breadcrumb.label && (
            <li>
              <Link href={breadcrumb.href} className="text-sky-600">
                {breadcrumb.label}
              </Link>
              <span className="mx-2"> &gt; </span>
            </li>
          )}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumbs;
