import TopPageSection from "../layouts/with-children/TopPageSection";
import NextLinkButton from "../ui/button/NextLinkButton";

type CTASectionProps = {
  title: string;
  texts: string[];
  buttonText?: string;
  linkURL?: string;
};

const CTASection: React.FC<CTASectionProps> = ({
  title,
  texts,
  buttonText,
  linkURL,
}) => {
  return (
    <TopPageSection
      bg="bg-blue-800"
      maxWidth="max-w-[750px]"
      className="max-w-[700px] px-8 pb-8 border rounded bg-white"
    >
      <h2 className="h2 text-center">{title}</h2>
      {texts.map((text, index) => {
        return (
          <p key={index} className="text-center my-4">
            {text}
          </p>
        );
      })}
      {buttonText && linkURL && (
        <div className="flex items-center justify-center">
          <NextLinkButton
            href={`${linkURL}`}
            color="blue"
            className="rounded"
          >
            {buttonText}
          </NextLinkButton>
        </div>
      )}
    </TopPageSection>
  );
};

export default CTASection;
