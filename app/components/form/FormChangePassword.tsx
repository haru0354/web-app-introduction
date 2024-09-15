"use client";

import { useFormState } from "react-dom";
import InputText from "../ui/InputText";
import Button from "../ui/Button";
import useToggleModal from "../hooks/useToggleModal";
import { useEffect } from "react";
import { signOut } from "next-auth/react";

type FormChangePasswordProps = {
  userId: string;
};

type FormChangePasswordState = {
  message?: string | null;
  errors?: {
    existingPassword?: string[] | undefined;
    newPasswordOne?: string[] | undefined;
    newPasswordTwo?: string[] | undefined;
  };
};

const FormChangePassword: React.FC<FormChangePasswordProps> = ({ userId }) => {
  const { closeModal } = useToggleModal();

  const initialState = {
    message: null,
    errors: {
      existingPassword: undefined,
      newPasswordOne: undefined,
      newPasswordTwo: undefined,
    },
  };

  const [state, dispatch] = useFormState<FormChangePasswordState, FormData>(
    serverAction,
    initialState
  );

  useEffect(() => {
    if (state.message === "success") {
      signOut({ callbackUrl: "/" });
    }
  }, [state.message, closeModal]);

  return (
    <form action={dispatch} className="w-full mx-auto">
      <p className="text-center font-semibold pb-2 mb-6 border-b border-dashed border-gray-700">
        パスワードの変更
      </p>
      <InputText
        type="existingPassword"
        label="登録中のパスワード"
        name="password"
        placeholder="確認の為、登録しているパスワードを入力してください"
      />
      {state.errors && state.errors.existingPassword && (
        <p className="mb-4 text-red-500">{state.errors.existingPassword}</p>
      )}
      <InputText
        type="password"
        label="新しくするパスワード"
        name="newPasswordOne"
        placeholder="新しくするパスワードを入力してください"
      />
      {state.errors && state.errors.newPasswordOne && (
        <p className="mb-4 text-red-500">{state.errors.newPasswordOne}</p>
      )}
      <InputText
        type="password"
        label="新しくするパスワード"
        name="newPasswordTwo"
        placeholder="確認の為新しくするパスワードを再度入力してください"
      />
      {state.errors && state.errors.newPasswordTwo && (
        <p className="mb-4 text-red-500">{state.errors.newPasswordTwo}</p>
      )}
      <input type="hidden" name="userId" value={userId} />
      {state.message && <p className="mb-4 text-red-500">{state.message}</p>}
      <Button color="blue" size="normal" className="block mx-auto">
        編集
      </Button>
    </form>
  );
};

export default FormChangePassword;
