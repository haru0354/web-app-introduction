"use client";

import { useFormState } from "react-dom";
import InputText from "../ui/InputText";
import Textarea from "../ui/Textarea";
import Button from "../ui/Button";
import DynamicInputText from "../ui/DynamicInputText";

type FormAppIntroductionProps = {
  formAction: (state: FormState, formData: FormData) => Promise<FormState>;
};

type FormState = {
  message?: string | null;
  errors?: {
    title?: string | undefined;
    summary?: string | undefined;
    url?: string | undefined;
    technology?: string | undefined;
    overview?: string | undefined;
    solution?: string | undefined;
    can?: string[] | undefined;
  };
};

const FormAppIntroduction: React.FC<FormAppIntroductionProps> = ({
  formAction,
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

  return (
    <form action={dispatch} className="max-w-[700px] w-[80vw]">
      <p className="text-center font-semibold pb-2  mb-6 border-b border-dashed border-gray-700">
        アプリの追加フォーム
      </p>
      <InputText
        label="アプリ名"
        name="title"
        placeholder="アプリ名を入力してください。"
      />
      {state.errors && <p className="text-red-500">{state.errors.title}</p>}
      <InputText
        label="アプリの種類"
        name="summary"
        placeholder="一言でどんなアプリか入力してください。"
      />
      {state.errors && <p className="text-red-500">{state.errors.summary}</p>}
      <InputText
        label="URL"
        name="url"
        placeholder="アプリのURLを入力してください。"
      />
      {state.errors && <p className="text-red-500">{state.errors.url}</p>}
      <InputText
        label="使用技術"
        name="technology"
        placeholder="使用技術を入力してください。"
      />
      {state.errors && (
        <p className="text-red-500">{state.errors.technology}</p>
      )}
      <Textarea
        label="詳細"
        name="overview"
        placeholder="アプリの詳細を入力してください。"
      />
      {state.errors && <p className="text-red-500">{state.errors.overview}</p>}{" "}
      <InputText
        label="解決できる課題"
        name="solution"
        placeholder="アプリで解決できる課題を入力してください。"
      />
      {state.errors && <p className="text-red-500">{state.errors.solution}</p>}
      <DynamicInputText />
      {state.errors && <p className="text-red-500">{state.errors.can}</p>}
      <input type="hidden" name="userId" value="669e16cd03bbe8839f00f345"/>
      <Button color="blue" size="normal" className="block mx-auto">
        アプリを追加
      </Button>
    </form>
  );
};

export default FormAppIntroduction;
