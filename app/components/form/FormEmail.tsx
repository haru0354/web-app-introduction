"use client";

import { useFormState } from "react-dom";
import { useEffect } from "react";
import { signOut } from "next-auth/react";

import { updateEmail } from "@/app/action/actionUser";
import useToggleModal from "../hooks/useToggleModal";
import InputText from "../ui/InputText";
import Button from "../ui/Button";

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
    <form action={dispatch} className="w-full mx-auto">
      <p className="text-center font-semibold pb-2 mb-6 border-b border-dashed border-customBlack">
        メールアドレスの変更
      </p>
      <InputText
        label="登録中のメールアドレス"
        name="email"
        placeholder="登録中のメールアドレスです"
      />
      {state.errors && state.errors.email && (
        <p className="mb-4 text-red-500">{state.errors.email}</p>
      )}
      <InputText
        label="新しいメールアドレス"
        name="newEmail"
        placeholder="新しいメールアドレスを入力してください。"
      />
      {state.errors && state.errors.newEmail && (
        <p className="mb-4 text-red-500">{state.errors.newEmail}</p>
      )}
      <InputText
        type="password"
        label="登録中のパスワード"
        name="password"
        placeholder="確認の為、登録しているパスワードを入力してください"
      />
      {state.errors && state.errors.password && (
        <p className="mb-4 text-red-500">{state.errors.password}</p>
      )}
      {state.message && state.message !== "success" && (
        <p className="mb-4 text-red-500">{state.message}</p>
      )}
      <Button color="blue" size="normal" className="block mx-auto">
        変更
      </Button>
    </form>
  );
};

export default FormEmail;
