import Image from "next/image";
import TopPageSection from "../layouts/with-children/TopPageSection";

type HeroProps = {
  title: string;
  texts: string[];
  buttonText: string;
};

const Hero: React.FC<HeroProps> = () => {
  return (
    <TopPageSection backgroundImage="/test.JPG">
      <div className="flex flex-col md:flex-row justify-between px-2 md:mt-10 md:mb-16">
        <div className="flex flex-col justify-start items-center md:items-start w-full px-4 md:px-12">
          <h2 className="text-4xl font-semibold text-green-800 mb-6">
            WEBアプリ専門サイト
          </h2>
          <p>「便利なWEBアプリを探せる」</p>
          <p>「WEBアプリの掲載ができる」</p>
          <p>様々なアプリから興味があるのを簡単に探すことができます。</p>
          <p>
            また、製作者は無料で簡単に掲載をすることができるサービスです。
          </p>
        </div>
        <div className="mx-auto">
          <Image src="/test.JPG" width={400} height={400} alt="aa" />
        </div>
      </div>
    </TopPageSection>
  );
};

export default Hero;
