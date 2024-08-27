"use client";

import { useFormState } from "react-dom";
import InputText from "../ui/InputText";
import Button from "../ui/Button";

type FormAuthProps = {
  formAction: (
    state: FormAuthState,
    formData: FormData
  ) => Promise<FormAuthState>;
  formName: string;
};

type FormAuthState = {
  message?: string | null;
  errors?: {
    email?: string[] | undefined;
    password?: string[] | undefined;
  };
};

const FormAuth: React.FC<FormAuthProps> = ({ formAction, formName }) => {
  const initialState = {
    message: null,
    errors: {
      email: undefined,
      password: undefined,
    },
  };

  const [state, dispatch] = useFormState<FormAuthState, FormData>(
    formAction,
    initialState
  );

  return (
    <form action={dispatch} className="max-w-[700px] w-[80vw] mx-auto">
      <p className="text-center font-semibold pb-2  mb-6 border-b border-dashed border-gray-700">
        {formName}
      </p>
      <InputText
        label="email"
        name="email"
        placeholder="emailを入力してください"
      />
      {state.errors && state.errors.email && (
        <p className="mb-4 text-red-500">{state.errors.email}</p>
      )}
      <InputText
        label="password"
        name="password"
        placeholder="passwordを入力してください"
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

export default FormAuth;
