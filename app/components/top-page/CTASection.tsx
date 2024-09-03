import { signUp } from "@/app/action/ActionUser";
import FormSignUp from "../auth/FormSignUp";
import Modal from "../layouts/with-children/Modal";
import TopPageSection from "../layouts/with-children/TopPageSection";
import Button from "../ui/Button";
import Link from "next/link";

type CTASectionProps = {
  title: string;
  texts: string[];
  buttonText: string;
};

const CTASection: React.FC<CTASectionProps> = ({
  title,
  texts,
  buttonText,
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
      <Link href="/signup">
        <Button color="blue" className="block mx-auto">{buttonText}</Button>
      </Link>
    </TopPageSection>
  );
};

export default CTASection;
