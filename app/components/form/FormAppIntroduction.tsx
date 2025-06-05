"use client";

import { useFormState } from "react-dom";
import { useEffect } from "react";

import FormContainer from "../layouts/with-children/FormContainer";
import useToggleModal from "../../hooks/useToggleModal";
import InputText from "../ui/InputText";
import Textarea from "../ui/Textarea";
import DynamicInputText from "../ui/DynamicInputText";
import InputImage from "../ui/InputImage";

import type { AppIntroductionFormState } from "@/types/formStateTypes";
import type { AppIntroduction } from "@prisma/client";

type FormAppIntroductionProps = {
  formAction: (
    state: AppIntroductionFormState,
    formData: FormData
  ) => Promise<AppIntroductionFormState>;
  formName: string;
  userId: string;
  appIntroductionData?: AppIntroduction | null;
  appId?: string;
  backButton?: boolean;
  isModalPage?: boolean;
};

const FormAppIntroduction: React.FC<FormAppIntroductionProps> = ({
  formAction,
  formName,
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

  const [state, dispatch] = useFormState<AppIntroductionFormState, FormData>(
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
    <FormContainer
      action={dispatch}
      buttonName="保存"
      formName={formName}
      backButton={backButton}
      message={state.message}
    >
      <InputText
        label="アプリ名"
        name="title"
        placeholder="アプリ名を入力してください。"
        defaultValue={appIntroductionData?.title}
        error={state.errors?.title}
      />
      <InputText
        label="アプリの種類"
        name="summary"
        placeholder="一言でどんなアプリか入力してください。"
        defaultValue={appIntroductionData?.summary}
        error={state.errors?.summary}
      />
      <InputText
        label="URL"
        name="url"
        placeholder="アプリのURLを入力してください。"
        defaultValue={appIntroductionData?.url}
        error={state.errors?.url}
      />
      <InputText
        label="使用技術"
        name="technology"
        placeholder="使用技術を入力してください。"
        defaultValue={appIntroductionData?.technology ?? undefined}
        error={state.errors?.technology}
      />
      <Textarea
        label="詳細"
        name="overview"
        placeholder="アプリの詳細を入力してください。"
        defaultValue={appIntroductionData?.overview}
        error={state.errors?.overview}
      />
      <InputText
        label="解決できる課題"
        name="solution"
        placeholder="アプリで解決できる課題を入力してください。"
        defaultValue={appIntroductionData?.solution}
        error={state.errors?.solution}
      />
      <DynamicInputText
        label="出来ることリスト"
        defaultValue={appIntroductionData?.can}
        error={state.errors?.can}
      />
      <InputImage label="画像のアップロード" name="imageFile" />
      <InputText
        label="画像の説明"
        name="imageALT"
        placeholder="アップロードする画像の簡単な説明"
        error={state.errors?.imageALT}
      />
      {appId && <input type="hidden" name="appId" value={appId} />}
    </FormContainer>
  );
};

export default FormAppIntroduction;
