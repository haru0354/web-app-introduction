"use client";

import { useFormState } from "react-dom";
import InputText from "../ui/InputText";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";
import DynamicInputText from "../ui/DynamicInputText";
import Link from "next/link";
import InputImage from "../ui/InputImage";
import useToggleModal from "../hooks/useToggleModal";
import { useEffect } from "react";

type FormAppIntroductionProps = {
  formAction: (state: FormState, formData: FormData) => Promise<FormState>;
  formName: string;
  userId?: string;
  appIntroductionData?: AppIntroduction | null;
  appId?: string;
  backButton?: boolean;
  isModalPage?: boolean;
};

type AppIntroduction = {
  title: string;
  summary: string;
  url: string;
  technology?: string | null;
  overview: string;
  solution: string;
  can: string[];
  imageALT?: string | null;
};

type FormState = {
  message?: string | null;
  errors?: {
    title?: string[] | undefined;
    summary?: string[] | undefined;
    url?: string[] | undefined;
    technology?: string[] | undefined;
    overview?: string[] | undefined;
    solution?: string[] | undefined;
    can?: string[] | undefined;
    image?: string[] | undefined;
    imageALT?: string[] | undefined;
  };
};

const FormAppIntroduction: React.FC<FormAppIntroductionProps> = ({
  formAction,
  formName,
  userId,
  appIntroductionData,
  appId,
  backButton = false,
  isModalPage = false,
}) => {
  const initialState = {
    message: null,
    errors: {
      title: undefined,
      summary: undefined,
      url: undefined,
      technology: undefined,
      overview: undefined,
      solution: undefined,
      can: undefined,
    },
  };

  const [state, dispatch] = useFormState<FormState, FormData>(
    formAction,
    initialState
  );

  if (isModalPage === true) {
    const { closeModal } = useToggleModal();
    useEffect(() => {
      if (state.message === "success") {
        closeModal();
      }
    }, [state.message, closeModal]);
  }
  
  return (
    <form action={dispatch} className="w-full mx-auto">
      <p className="text-center font-semibold pb-2  mb-6 border-b border-dashed border-gray-700">
        {formName}
      </p>
      <InputText
        label="アプリ名"
        name="title"
        placeholder="アプリ名を入力してください。"
        defaultValue={appIntroductionData?.title}
      />
      {state.errors && state.errors.title && (
        <p className="mb-4 text-red-500">{state.errors.title}</p>
      )}
      <InputText
        label="アプリの種類"
        name="summary"
        placeholder="一言でどんなアプリか入力してください。"
        defaultValue={appIntroductionData?.summary}
      />
      {state.errors && state.errors.summary && (
        <p className="mb-4 text-red-500">{state.errors.summary}</p>
      )}
      <InputText
        label="URL"
        name="url"
        placeholder="アプリのURLを入力してください。"
        defaultValue={appIntroductionData?.url}
      />
      {state.errors && state.errors.url && (
        <p className="mb-4 text-red-500">{state.errors.url}</p>
      )}
      <InputText
        label="使用技術"
        name="technology"
        placeholder="使用技術を入力してください。"
        defaultValue={appIntroductionData?.technology ?? undefined}
      />
      {state.errors && state.errors.technology && (
        <p className="mb-4 text-red-500">{state.errors.technology}</p>
      )}
      <Textarea
        label="詳細"
        name="overview"
        placeholder="アプリの詳細を入力してください。"
        defaultValue={appIntroductionData?.overview}
      />
      {state.errors && state.errors.overview && (
        <p className="mb-4 text-red-500">{state.errors.overview}</p>
      )}
      <InputText
        label="解決できる課題"
        name="solution"
        placeholder="アプリで解決できる課題を入力してください。"
        defaultValue={appIntroductionData?.solution}
      />
      {state.errors && state.errors.solution && (
        <p className="mb-4 text-red-500">{state.errors.solution}</p>
      )}
      <DynamicInputText defaultValue={appIntroductionData?.can} />
      {state.errors && state.errors.can && (
        <p className="mb-4 text-red-500">{state.errors.can}</p>
      )}
      <InputImage label="画像のアップロード" name="imageFile" />
      <InputText
        label="画像の説明"
        name="imageALT"
        placeholder="アップロードする画像の簡単な説明"
      />
      {state.errors && state.errors.imageALT && (
        <p className="mb-4 text-red-500">{state.errors.imageALT}</p>
      )}
      {userId && <input type="hidden" name="userId" value={userId} />}
      {appId && <input type="hidden" name="appId" value={appId} />}
      {state.errors && state.errors.imageALT && (
        <p className="mb-4 text-red-500">{state.errors.image}</p>
      )}
      {state.message && (
        <p className="mb-4 text-center text-red-500">{state.message}</p>
      )}
      <Button color="blue" size="normal" className="block mx-auto">
        保存
      </Button>
      {backButton && (
        <Link href="/dashboard">
          <Button
            color="gray"
            size="normal"
            className="block mx-auto"
            type="button"
          >
            キャンセル
          </Button>
        </Link>
      )}
    </form>
  );
};

export default FormAppIntroduction;
