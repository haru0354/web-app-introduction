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
        error={state.errors?.selfIntroduction}
      />
      <InputText
        label="職業"
        name="occupation"
        placeholder="職業・職種を入力してください。例:フロントエンドエンジニア"
        defaultValue={profile.occupation ?? undefined}
        error={state.errors?.occupation}
      />
      <InputText
        label="プログラミングスキル"
        name="skill"
        placeholder="プログラミングスキルを入力してください。例:React,PHP"
        defaultValue={profile.skill ?? undefined}
        error={state.errors?.skill}
      />
      <InputText
        label="ポートフォリオサイト(URL)"
        name="portfolio"
        placeholder="ポートフォリオサイトのURLを入力してください。"
        defaultValue={profile.portfolio ?? undefined}
        error={state.errors?.portfolio}
      />
      <InputText
        label="GitHub(URL)"
        name="gitHub"
        placeholder="GitHubのURLを入力してください。"
        defaultValue={profile.gitHub ?? undefined}
        error={state.errors?.gitHub}
      />
      <InputText
        label="X(URL)"
        name="x"
        placeholder="XのURLを入力してください。"
        defaultValue={profile.x ?? undefined}
        error={state.errors?.x}
      />
      {state.message && state.message !== "success" && (
        <p className="mt-4 text-center text-sm text-red-600">{state.message}</p>
      )}
      <Button
        type="submit"
        color="blue"
        size="normal"
        className="block mx-auto rounded"
      >
        編集
      </Button>
    </form>
  );
};

export default FormProfile;
