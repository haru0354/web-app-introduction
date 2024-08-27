"use client";

import Button from "../ui/Button";
import InputText from "../ui/InputText";
import { signIn } from "next-auth/react";

const FormLogin = () => {
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      const result = await signIn("appIntroduction", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        console.log("ログインに失敗しました。", result.error);
        return;
      }

      console.log("ログインに成功しました。");
    } catch (error) {
      console.error("ログイン中にエラーが発生しました：", error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-[700px] w-[80vw] mx-auto">
      <p className="text-center font-semibold pb-2  mb-6 border-b border-dashed border-gray-700">
        ログイン
      </p>
      <InputText
        label="email"
        name="email"
        placeholder="emailを入力してください"
      />
      <InputText
        label="password"
        name="password"
        placeholder="passwordを入力してください"
      />
      <Button
        type="submit"
        color="blue"
        size="normal"
        className="block mx-auto"
      >
        ログイン
      </Button>
    </form>
  );
};

export default FormLogin;
