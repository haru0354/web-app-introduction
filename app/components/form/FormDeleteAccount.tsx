"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { signOut } from "next-auth/react";

import { deleteAccount } from "@/app/action/actionUser";
import useToggleModal from "../hooks/useToggleModal";
import InputText from "../ui/InputText";
import Button from "../ui/Button";
import { DeleteAccountFormState } from "@/types/formStateTypes";

type FormDeleteAccountProps = {
  userId: string;
};

const FormDeleteAccount: React.FC<FormDeleteAccountProps> = ({ userId }) => {
  const { closeModal } = useToggleModal();

  const initialState = {
    message: null,
    errors: {
      password: undefined,
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
    <>
      <form action={dispatch} className="w-full mx-auto">
        <p className="text-center font-semibold pb-2 mb-6 border-b border-dashed border-customBlack">
          アカウントの削除
        </p>
        <InputText
          type="password"
          label="パスワード"
          name="password"
          placeholder="現在登録しているパスワードを入力してください"
        />
        {state.errors && state.errors.password && (
          <p className="mb-4 text-red-500">{state.errors.password}</p>
        )}
        <input type="hidden" name="userId" value={userId} />
        {state.message && <p className="mb-4 text-red-500">{state.message}</p>}
        <Button color="red" size="normal" className="block mx-auto">
          削除
        </Button>
      </form>
    </>
  );
};

export default FormDeleteAccount;
