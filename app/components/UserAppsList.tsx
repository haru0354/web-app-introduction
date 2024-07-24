import Image from "next/image";
import Link from "next/link";
import Button from "./ui/Button";

type UserAppsListProps = {
  appIntroductions: AppIntroductions[];
};

type AppIntroductions = {
  id: string;
  title: string;
  summary: string;
  images: Image;
};

type Image = {
  imageURL: string;
  imageALT: string;
};

const UserAppsList: React.FC<UserAppsListProps> = ({ appIntroductions }) => {
  return (
    <div className="flex flex-wrap">
      {appIntroductions.map((appIntroduction) => {
        return (
          <>
            <div
              key={appIntroduction.id}
              className="flex flex-col items-center justify-center min-w-[200px] min-h-[200px] mx-2 my-6 text-center"
            >
              <Link href={`/app/${appIntroduction.id}`}>
                <Image
                  src={
                    appIntroduction.images.imageURL
                      ? appIntroduction.images.imageURL
                      : "/test.JPG"
                  }
                  width={200}
                  height={200}
                  alt={
                    appIntroduction.images.imageALT
                      ? appIntroduction.images.imageALT
                      : "test"
                  }
                  className="border border-gray-400"
                />
              </Link>
              <h2 className="text-gray-600 font-semibold">
                {appIntroduction.title}
              </h2>
              {appIntroduction.summary}
              <Link href={`/dashboard/${appIntroduction.id}`}>
                <Button color="gray" size="normal" className=" ">
                  編集
                </Button>
              </Link>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default UserAppsList;
