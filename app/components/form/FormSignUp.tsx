"use client";

import { useFormState } from "react-dom";
import InputText from "../ui/InputText";
import Button from "../ui/Button";

type FormSignUpProps = {
  formAction: (
    state: FormSignUpState,
    formData: FormData
  ) => Promise<FormSignUpState>;
};

type FormSignUpState = {
  message?: string | null;
  errors?: {
    email?: string[] | undefined;
    password?: string[] | undefined;
  };
};

const FormSignUp: React.FC<FormSignUpProps> = ({ formAction }) => {
  const initialState = {
    message: null,
    errors: {
      email: undefined,
      password: undefined,
    },
  };

  const [state, dispatch] = useFormState<FormSignUpState, FormData>(
    formAction,
    initialState
  );

  return (
    <form action={dispatch} className="w-full">
      <p className="text-center font-semibold pb-2  mb-6 border-b border-dashed border-customBlack">
        登録
      </p>
      <InputText
        label="メールアドレス"
        name="email"
        placeholder="メールアドレスを入力してください"
      />
      {state.errors && state.errors.email && (
        <p className="mb-4 text-red-500">{state.errors.email}</p>
      )}
      <InputText
        type="password"
        label="パスワード"
        name="password"
        placeholder="パスワードを入力してください"
      />
      {state.errors && state.errors.password && (
        <p className="mb-4 text-red-500">{state.errors.password}</p>
      )}
      {state.message && <p className="mb-4 text-red-500">{state.message}</p>}
      <Button color="blue" size="normal" className="block mx-auto">
        登録
      </Button>
    </form>
  );
};

export default FormSignUp;
