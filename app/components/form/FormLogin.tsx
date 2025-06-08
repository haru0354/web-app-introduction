"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

import FormContainer from "../layouts/FormContainer";
import InputText from "../ui/InputText";

const FormLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      await signIn("appIntroduction", {
        email,
        password,
        callbackUrl: "/dashboard",
        redirect: true,
      });
    } catch (error) {
      setError("ログイン中にエラーが発生しました。");
      console.error("ログイン中にエラーが発生しました：", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer
      onSubmit={onSubmit}
      buttonName="ログイン"
      formName="ログイン"
      message={error}
    >
      <InputText
        type="email"
        label="メールアドレス"
        name="email"
        placeholder="メールアドレスを入力してください"
      />
      <InputText
        type="password"
        label="パスワード"
        name="password"
        placeholder="パスワードを入力してください"
      />
      {isLoading && (
        <>
          <p>ログイン中...</p>
          <p>しばらくお待ちください。</p>
        </>
      )}
    </FormContainer>
  );
};

export default FormLogin;
