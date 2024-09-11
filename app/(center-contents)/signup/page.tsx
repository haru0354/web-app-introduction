import { signUp } from "@/app/action/ActionUser";
import FormSignUp from "@/app/components/form/FormSignUp";

const page = () => {
  return (
    <div className="w-full max-w-[400px] p-4 mx-auto border rounded border-gray-400 bg-white">
      <FormSignUp formAction={signUp} />
    </div>
  );
};

export default page;
