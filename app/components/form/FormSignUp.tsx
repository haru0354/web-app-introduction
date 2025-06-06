"use client";

import { useFormState } from "react-dom";

import FormContainer from "../layouts/with-children/FormContainer";
import InputText from "../ui/InputText";

import type { SignUpFormState } from "@/types/formStateTypes";

type FormSignUpProps = {
  formAction: (
    state: SignUpFormState,
    formData: FormData
  ) => Promise<SignUpFormState>;
};

const FormSignUp: React.FC<FormSignUpProps> = ({ formAction }) => {
  const initialState = {
    message: null,
    errors: {
      email: undefined,
      password: undefined,
    },
  };

  const [state, dispatch] = useFormState<SignUpFormState, FormData>(
    formAction,
    initialState
  );

  return (
    <FormContainer
      action={dispatch}
      buttonName="登録"
      formName="ユーザー登録"
      message={state.message}
    >
      <InputText
        label="メールアドレス"
        name="email"
        placeholder="メールアドレスを入力してください"
        error={state.errors?.email}
      />
      <InputText
        type="password"
        label="パスワード"
        name="password"
        placeholder="パスワードを入力してください"
        error={state.errors?.password}
      />
    </FormContainer>
  );
};

export default FormSignUp;
