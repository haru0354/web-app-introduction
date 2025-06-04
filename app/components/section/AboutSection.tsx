import TwoFlexBox from "../layouts/TwoFlexBox";
import TopPageSection from "../layouts/with-children/TopPageSection";
import NextLinkButton from "../ui/button/NextLinkButton";

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
        <div className="flex items-center justify-center">
          <NextLinkButton
            href={`${buttonLinkURL}`}
            color="white"
            size="big"
            className="rounded"
          >
            {buttonText}
          </NextLinkButton>
        </div>
      )}
    </TopPageSection>
  );
};

export default AboutSection;
