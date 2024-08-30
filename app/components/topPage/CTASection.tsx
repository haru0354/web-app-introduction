import { signUp } from "@/app/action/ActionUser";
import FormSignUp from "../auth/FormSignUp";
import Button from "../ui/Button";
import Modal from "../ui/Modal";

const ctaSection = `
  padding-top: 60px;
  padding-bottom: 60px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #25448b;
`;

const ctaContainer = `
  text-align: center;
  padding: 40px;
  margin: 0px auto;
  max-width: 700px;
  border: 1px solid #25448b;
  border-radius: 4px;
  background-color: #fffdfb;
`;

const sectionH2Style = `
  text-align: center;
  margin-top: 0rem;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  font-weight: 600;
`;

type CTASectionProps = {
  title:string;
  texts: string[];
  buttonText:string;
}

const CTASection: React.FC<CTASectionProps> = ({ title, texts, buttonText }) => {

  return (
    <section className="max-w-[1140px] py-12 bg-blue-700">
      <div className="px-8 pb-8 mx-auto max-w-[700px] border rounded bg-white">
        <h2 className="h2 text-center ">{title}</h2>
          {texts.map((text, index) => {
            return (
              <p key={index} className="text-center my-4">{text}</p>
            )
          })}
        <Modal buttonText={buttonText} buttonColor="blue" buttonSize="normal">
            <FormSignUp formAction={signUp} />
          </Modal>
      </div>
    </section>
  );
};

export default CTASection;
