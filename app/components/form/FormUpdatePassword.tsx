"use client";

import { useFormState } from "react-dom";
import InputText from "../ui/InputText";
import Button from "../ui/Button";
import useToggleModal from "../hooks/useToggleModal";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { updatePassword } from "@/app/action/ActionUser";

type FormUpdatePasswordProps = {
  userId: string;
};

type FormUpdatePasswordState = {
  message?: string | null;
  errors?: {
    existingPassword?: string[] | undefined;
    newPasswordOne?: string[] | undefined;
    newPasswordTwo?: string[] | undefined;
  };
};

const FormUpdatePassword: React.FC<FormUpdatePasswordProps> = ({ userId }) => {
  const { closeModal } = useToggleModal();

  const initialState = {
    message: null,
    errors: {
      existingPassword: undefined,
      newPasswordOne: undefined,
      newPasswordTwo: undefined,
    },
  };

  const [state, dispatch] = useFormState<FormUpdatePasswordState, FormData>(
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
        name="existingPassword"
        placeholder="確認の為、現在登録しているパスワードを入力してください"
      />
      {state.errors && state.errors.existingPassword && (
        <p className="mb-4 text-red-500">{state.errors.existingPassword}</p>
      )}
      <InputText
        type="password"
        label="新しいパスワード"
        name="newPasswordOne"
        placeholder="新しいパスワードを入力してください"
      />
      {state.errors && state.errors.newPasswordOne && (
        <p className="mb-4 text-red-500">{state.errors.newPasswordOne}</p>
      )}
      <InputText
        type="password"
        label="新しいパスワード"
        name="newPasswordTwo"
        placeholder="確認の為、新しいパスワードを再度入力してください"
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

export default FormUpdatePassword;
