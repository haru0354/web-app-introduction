"use client";

import { useFormState } from "react-dom";
import { useEffect } from "react";

import { editProfile } from "@/app/action/actionProfile";
import useToggleModal from "../../hooks/useToggleModal";
import InputText from "../ui/InputText";
import Textarea from "../ui/Textarea";
import Button from "../ui/button/Button";

import type { Profile } from "@prisma/client";
import type { ProfileFormState } from "@/types/formStateTypes";

type FormProfileProps = {
  userId: string;
  profile: Profile;
};

const FormProfile: React.FC<FormProfileProps> = ({ profile, userId }) => {
  const { closeModal } = useToggleModal();

  const initialState = {
    message: null,
    errors: {
      selfIntroduction: undefined,
      occupation: undefined,
      skill: undefined,
      portfolio: undefined,
      overview: undefined,
      gitHub: undefined,
      x: undefined,
    },
  };

  const [state, dispatch] = useFormState<ProfileFormState, FormData>(
    editProfile,
    initialState
  );

  useEffect(() => {
    if (state.message === "success") {
      closeModal();
    }
  }, [state.message, closeModal]);

  return (
    <form action={dispatch} className="w-full mx-auto">
      <p className="text-center font-semibold pb-2  mb-6 border-b border-dashed border-customBlack">
        プロフィールの編集
      </p>
      <Textarea
        label="自己紹介"
        name="selfIntroduction"
        placeholder="自己紹介を入力してください。"
        defaultValue={profile.selfIntroduction ?? undefined}
      />
      {state.errors && state.errors.selfIntroduction && (
        <p className="mb-4 text-red-500">{state.errors.selfIntroduction}</p>
      )}
      <InputText
        label="職業"
        name="occupation"
        placeholder="職業・職種を入力してください。例:フロントエンドエンジニア"
        defaultValue={profile.occupation ?? undefined}
      />
      {state.errors && state.errors.occupation && (
        <p className="mb-4 text-red-500">{state.errors.occupation}</p>
      )}
      <InputText
        label="プログラミングスキル"
        name="skill"
        placeholder="プログラミングスキルを入力してください。例:React,PHP"
        defaultValue={profile.skill ?? undefined}
      />
      {state.errors && state.errors.skill && (
        <p className="mb-4 text-red-500">{state.errors.skill}</p>
      )}
      <InputText
        label="ポートフォリオサイト(URL)"
        name="portfolio"
        placeholder="ポートフォリオサイトのURLを入力してください。"
        defaultValue={profile.portfolio ?? undefined}
      />
      {state.errors && state.errors.portfolio && (
        <p className="mb-4 text-red-500">{state.errors.portfolio}</p>
      )}
      <InputText
        label="GitHub(URL)"
        name="gitHub"
        placeholder="GitHubのURLを入力してください。"
        defaultValue={profile.gitHub ?? undefined}
      />
      {state.errors && state.errors.gitHub && (
        <p className="mb-4 text-red-500">{state.errors.gitHub}</p>
      )}
      <InputText
        label="X(URL)"
        name="x"
        placeholder="XのURLを入力してください。"
        defaultValue={profile.x ?? undefined}
      />
      {state.errors && state.errors.x && (
        <p className="mb-4 text-red-500">{state.errors.x}</p>
      )}
      {state.message && state.message !== "success" && (
        <p className="mb-4 text-red-500">{state.message}</p>
      )}
      <Button color="blue" size="normal" className="block mx-auto">
        編集
      </Button>
    </form>
  );
};

export default FormProfile;
