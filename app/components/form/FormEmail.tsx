"use client";

import { useFormState } from "react-dom";
import { useEffect } from "react";
import { signOut } from "next-auth/react";

import { updateEmail } from "@/app/action/actionUser";
import FormContainer from "../layouts/FormContainer";
import useToggleModal from "../../hooks/useToggleModal";
import InputText from "../ui/InputText";

import type { EmailFormState } from "@/types/formStateTypes";

type FormEmailProps = {
  userId: string;
  email: string | undefined;
};

const FormEmail: React.FC<FormEmailProps> = ({ userId, email }) => {
  const { closeModal } = useToggleModal();

  const initialState = {
    message: null,
    errors: {
      email: undefined,
      newEmail: undefined,
      password: undefined,
    },
  };

  const [state, dispatch] = useFormState<EmailFormState, FormData>(
    updateEmail,
    initialState
  );

  useEffect(() => {
    if (state.message === "success") {
      signOut({ callbackUrl: "/" });
    }
  }, [state.message, closeModal]);

  return (
    <FormContainer
      action={dispatch}
      buttonName="変更"
      formName="メールアドレスの変更"
      message={state.message}
    >
      <InputText
        label="登録中のメールアドレス"
        name="email"
        placeholder="登録中のメールアドレスです"
        error={state.errors?.email}
      />
      <InputText
        label="新しいメールアドレス"
        name="newEmail"
        placeholder="新しいメールアドレスを入力してください。"
        error={state.errors?.newEmail}
      />
      <InputText
        type="password"
        label="登録中のパスワード"
        name="password"
        placeholder="確認の為、登録しているパスワードを入力してください"
        error={state.errors?.password}
      />
    </FormContainer>
  );
};

export default FormEmail;
