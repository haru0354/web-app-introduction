"use client";

import { useFormState } from "react-dom";
import { useEffect } from "react";
import { signOut } from "next-auth/react";

import { updatePassword } from "@/app/action/actionUser";
import InputText from "../ui/InputText";
import Button from "../ui/button/Button";
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
    <form action={dispatch} className="w-full mx-auto">
      <p className="text-center font-semibold pb-2 mb-6 border-b border-dashed border-customBlack">
        パスワードの変更
      </p>
      <InputText
        type="password"
        label="現在登録中のパスワード"
        name="password"
        placeholder="確認の為、現在登録しているパスワードを入力してください"
      />
      {state.errors && state.errors.password && (
        <p className="mb-4 text-red-500">{state.errors.password}</p>
      )}
      <InputText
        type="password"
        label="新しいパスワード"
        name="newPassword"
        placeholder="新しいパスワードを入力してください"
      />
      {state.errors && state.errors.newPassword && (
        <p className="mb-4 text-red-500">{state.errors.newPassword}</p>
      )}
      <InputText
        type="password"
        label="新しいパスワード（確認用）"
        name="confirmationPassword"
        placeholder="確認の為、新しいパスワードを再度入力してください"
      />
      {state.errors && state.errors.confirmationPassword && (
        <p className="mb-4 text-red-500">{state.errors.confirmationPassword}</p>
      )}
      {state.message && state.message !== "success" && (
        <p className="mb-4 text-red-500">{state.message}</p>
      )}
      <Button color="blue" size="normal" className="block mx-auto">
        編集
      </Button>
    </form>
  );
};

export default FormUpdatePassword;
