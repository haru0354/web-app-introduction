import { appIntroductions } from "@/seeds/appIntroductions";
import Image from "next/image";

const NewAppIntroductions = () => {
  const sortedAppIntroductions = appIntroductions.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const threeIntroductions = sortedAppIntroductions.slice(0, 3);

  return (
    <div>
      <h2 className="h2">新着のアプリ</h2>
      {threeIntroductions.map((appIntroduction) => (
        <div key={appIntroduction.id} className="w-full mx-auto text-center">
          <Image
            src={`/${appIntroduction.images[0].imageURL}`}
            width={250}
            height={250}
            alt={appIntroduction.images[0].imageALT}
          />
          <h3 className="text-semibold">{appIntroduction.title}</h3>
          <p>{appIntroduction.summary}</p>
        </div>
      ))}
    </div>
  );
};

export default NewAppIntroductions;
