"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { signOut } from "next-auth/react";

import { deleteAccount } from "@/app/action/actionUser";
import FormContainer from "../layouts/FormContainer";
import useToggleModal from "../../hooks/useToggleModal";
import InputText from "../ui/InputText";

import type { DeleteAccountFormState } from "@/types/formStateTypes";

type FormDeleteAccountProps = {
  userId: string;
};

const FormDeleteAccount: React.FC<FormDeleteAccountProps> = ({ userId }) => {
  const { closeModal } = useToggleModal();

  const initialState = {
    message: null,
    errors: {
      password: undefined,
      confirmationPassword: undefined,
    },
  };

  const [state, dispatch] = useFormState<DeleteAccountFormState, FormData>(
    deleteAccount,
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
      buttonName="削除"
      formName="アカウントの削除"
      buttonColor="red"
      message={state.message}
    >
      <InputText
        type="password"
        label="パスワード"
        name="password"
        placeholder="現在登録しているパスワードを入力してください"
        error={state.errors?.password}
      />
      <InputText
        type="password"
        label="パスワード（確認用）"
        name="confirmationPassword"
        placeholder="確認の為、再度パスワードを入力してください"
        error={state.errors?.confirmationPassword}
      />
    </FormContainer>
  );
};

export default FormDeleteAccount;
