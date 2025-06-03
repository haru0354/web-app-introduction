import Link from "next/link";

import TwoFlexBox from "../layouts/TwoFlexBox";
import TopPageSection from "../layouts/with-children/TopPageSection";
import Button from "../ui/button/Button";

type AboutSectionProps = {
  title: string;
  leftTitle: string;
  leftContents: string[];
  rightTitle: string;
  rightContents: string[];
  buttonText?: string;
  buttonLinkURL?: string;
};

const AboutSection: React.FC<AboutSectionProps> = ({
  title,
  leftTitle,
  leftContents,
  rightTitle,
  rightContents,
  buttonText,
  buttonLinkURL,
}) => {
  return (
    <TopPageSection bg="bg-blue-800">
      <h2 className="text-center text-2xl font-semibold mb-4 text-white">
        「{title}」
      </h2>
      <TwoFlexBox
        leftTitle={leftTitle}
        leftContents={leftContents}
        rightTitle={rightTitle}
        rightContents={rightContents}
      />
      {buttonLinkURL && buttonText && (
        <Link href={`${buttonLinkURL}`}>
          <Button color="white" size="big" className="block mx-auto rounded">
            {buttonText}
          </Button>
        </Link>
      )}
    </TopPageSection>
  );
};

export default AboutSection;
