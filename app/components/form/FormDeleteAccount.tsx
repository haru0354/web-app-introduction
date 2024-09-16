"use client";

import { useFormState } from "react-dom";
import InputText from "../ui/InputText";
import Button from "../ui/Button";
import useToggleModal from "../hooks/useToggleModal";
import { useEffect } from "react";
import { signOut } from "next-auth/react";

type FormDeleteAccountProps = {
  userId: string;
};

type FormDeleteAccountState = {
  message?: string | null;
  errors?: {
    password?: string[] | undefined;
  };
};

const FormDeleteAccount: React.FC<FormDeleteAccountProps> = ({ userId }) => {
  const { closeModal } = useToggleModal();

  const initialState = {
    message: null,
    errors: {
      password: undefined,
    },
  };

  const [state, dispatch] = useFormState<FormDeleteAccountState, FormData>(
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
        アカウントの削除
      </p>
      <InputText
        type="password"
        label="現在登録中のパスワード"
        name="existingPassword"
        placeholder="確認の為、現在登録しているパスワードを入力してください"
      />
      {state.errors && state.errors.password && (
        <p className="mb-4 text-red-500">{state.errors.password}</p>
      )}
      <input type="hidden" name="userId" value={userId} />
      {state.message && <p className="mb-4 text-red-500">{state.message}</p>}
      <Button color="blue" size="normal" className="block mx-auto">
        編集
      </Button>
    </form>
  );
};

export default FormDeleteAccount;
