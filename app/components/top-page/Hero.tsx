import Link from "next/link";
import TwoFlexBox from "../layouts/TwoFlexBox";
import TopPageSection from "../layouts/with-children/TopPageSection";
import Button from "../ui/Button";
import CTASection from "./CTASection";
import Image from "next/image";

type HeroProps = {
  title: string;
  texts: string[];
  buttonText: string;
};

const Hero: React.FC<HeroProps> = ({ title, texts, buttonText }) => {
  return (
    <TopPageSection backgroundImage="/test.JPG">
      <div className="flex flex-col md:flex-row justify-between px-2 md:mt-10 md:mb-16">
        <div className="flex flex-col justify-start items-center md:items-start w-full px-4 md:px-12">
          <p className="text-3xl font-semibold text-green-800 mb-4">
            WEBアプリを探せる
          </p>
          <p className="text-3xl font-semibold text-green-800 mb-4">
            WEBアプリの掲載ができる
          </p>
          <p>
            サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキスト
          </p>
          <p>
            サンプルテキストサンプルテキストサンプルテキストサンプルテキストサンプルテキスト
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
