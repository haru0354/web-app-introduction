import AuthContext from "@/app/context/AuthContext";
import TopPageSection from "../layouts/TopPageSection";
import DashboardOrRegisterLink from "../ui/button/DashboardOrRegisterLink";
import NextLinkButton from "../ui/button/NextLinkButton";

type CTASectionProps = {
  title: string;
  texts: string[];
  buttonText?: string;
  buttonLinkURL?: string;
  authButton?: boolean;
};

const CTASection: React.FC<CTASectionProps> = ({
  title,
  texts,
  buttonText,
  buttonLinkURL,
  authButton = false,
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
      {buttonText && buttonLinkURL && (
        <div className="flex items-center justify-center">
          <NextLinkButton href={`${buttonLinkURL}`} color="blue" className="rounded">
            {buttonText}
          </NextLinkButton>
        </div>
      )}
      {authButton && (
        <AuthContext>
          <DashboardOrRegisterLink buttonColor="blue" buttonSize="big" />
        </AuthContext>
      )}
    </TopPageSection>
  );
};

export default CTASection;
