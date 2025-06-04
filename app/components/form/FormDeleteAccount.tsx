"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { signOut } from "next-auth/react";

import { deleteAccount } from "@/app/action/actionUser";
import useToggleModal from "../../hooks/useToggleModal";
import InputText from "../ui/InputText";
import Button from "../ui/button/Button";

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
    <form action={dispatch} className="w-full mx-auto">
      <p className="text-center font-semibold pb-2 mb-6 border-b border-dashed border-customBlack">
        アカウントの削除
      </p>
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
      {state.message && state.message !== "success" && (
        <p className="mt-4 text-center text-sm text-red-600">{state.message}</p>
      )}
      <Button
        type="submit"
        color="red"
        size="normal"
        className="block mx-auto rounded"
      >
        削除
      </Button>
    </form>
  );
};

export default FormDeleteAccount;
