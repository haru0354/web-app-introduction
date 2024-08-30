import { signUp } from "@/app/action/ActionUser";
import FormSignUp from "../auth/FormSignUp";
import Modal from "../ui/Modal";
import TopPageSection from "../layout/TopPageSection";

type CTASectionProps = {
  title:string;
  texts: string[];
  buttonText:string;
}

const CTASection: React.FC<CTASectionProps> = ({ title, texts, buttonText }) => {

  return (
    <TopPageSection bg="bg-blue-800" maxWidth="max-w-[750px]" className="max-w-[700px] px-8 pb-8 border rounded bg-white">
        <h2 className="h2 text-center">{title}</h2>
          {texts.map((text, index) => {
            return (
              <p key={index} className="text-center my-4">{text}</p>
            )
          })}
        <Modal buttonText={buttonText} buttonColor="blue" buttonSize="normal">
            <FormSignUp formAction={signUp} />
          </Modal>
    </TopPageSection>
  );
};

export default CTASection;
