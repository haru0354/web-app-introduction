import Button from "../../ui/button/Button";
import NextLinkButton from "../../ui/button/NextLinkButton";

type FormContainerProps = {
  children: React.ReactNode;
  action: (payload: FormData) => void;
  formName: string;
  buttonName: string;
  buttonColor?: "blue" | "red" | "gray" | "white" | "black";
  message?: string | null;
  backButton?: boolean;
};

const FormContainer: React.FC<FormContainerProps> = ({
  children,
  action,
  formName,
  buttonName,
  buttonColor = "blue",
  message,
  backButton,
}) => {
  return (
    <form action={action} className="w-full mx-auto">
      <p className="text-center font-semibold pb-2 mb-6 border-b border-dashed border-customBlack">
        {formName}
      </p>
      {children}
      {message && message !== "success" && (
        <p className="mt-4 text-center text-sm text-red-600">{message}</p>
      )}
      <Button
        type="submit"
        color={buttonColor}
        size="normal"
        className="block mx-auto rounded"
      >
        {buttonName}
      </Button>
      {backButton && (
        <div className="flex items-center justify-center">
          <NextLinkButton href="/dashboard" color="gray" className="rounded">
            キャンセル
          </NextLinkButton>
        </div>
      )}
    </form>
  );
};

export default FormContainer;
