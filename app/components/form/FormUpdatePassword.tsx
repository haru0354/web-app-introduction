"use client";

import { useFormState } from "react-dom";
import { useEffect } from "react";
import { signOut } from "next-auth/react";

import { updatePassword } from "@/app/action/actionUser";
import FormContainer from "../layouts/FormContainer";
import InputText from "../ui/InputText";
import useToggleModal from "../../hooks/useToggleModal";

import type { UpdatePasswordFormState } from "@/types/formStateTypes";

type FormUpdatePasswordProps = {
  userId: string;
};

const FormUpdatePassword: React.FC<FormUpdatePasswordProps> = ({ userId }) => {
  const { closeModal } = useToggleModal();

  const initialState = {
    message: null,
    errors: {
      password: undefined,
      newPassword: undefined,
      confirmationPassword: undefined,
    },
  };

  const [state, dispatch] = useFormState<UpdatePasswordFormState, FormData>(
    updatePassword,
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
      buttonName="編集"
      formName="パスワードの変更"
      message={state.message}
    >
      <InputText
        type="password"
        label="現在登録中のパスワード"
        name="password"
        placeholder="確認の為、現在登録しているパスワードを入力してください"
        error={state.errors?.password}
      />
      <InputText
        type="password"
        label="新しいパスワード"
        name="newPassword"
        placeholder="新しいパスワードを入力してください"
        error={state.errors?.newPassword}
      />
      <InputText
        type="password"
        label="新しいパスワード（確認用）"
        name="confirmationPassword"
        placeholder="確認の為、新しいパスワードを再度入力してください"
        error={state.errors?.confirmationPassword}
      />
    </FormContainer>
  );
};

export default FormUpdatePassword;
