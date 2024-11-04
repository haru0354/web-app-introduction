"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <div className="max-w-[1140px] mx-auto text-sm my-2 md:my-0 px-4 md:px-6 ">
      <nav>
        <ol className="flex text-gray-500">
          <li>
            <Image
              src="/home_image.png"
              alt="home"
              width={25}
              height={25}
              className="inline mb-[2px] mr-2"
            />
            <Link href="/">ホーム</Link>
            {"　>　"}
          </li>
          {breadcrumb.label && (
            <li>
              <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
              {"　>　"}
            </li>
          )}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumbs;
