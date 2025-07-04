export type AppIntroductionFormState = {
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

export type SignUpFormState = {
  message?: string | null;
  errors?: {
    email?: string[] | undefined;
    password?: string[] | undefined;
  };
};

export type DeleteAccountFormState = {
  message?: string | null;
  errors?: {
    password?: string[] | undefined;
    confirmationPassword?: string[] | undefined;
  };
};

export type EmailFormState = {
  message?: string | null;
  errors?: {
    email?: string[] | undefined;
    newEmail?: string[] | undefined;
    password?: string[] | undefined;
  };
};

export type ProfileFormState = {
  message?: string | null;
  errors?: {
    selfIntroduction?: string[] | undefined;
    occupation?: string[] | undefined;
    skill?: string[] | undefined;
    portfolio?: string[] | undefined;
    gitHub?: string[] | undefined;
    x?: string[] | undefined;
  };
};

export type UpdatePasswordFormState = {
  message?: string | null;
  errors?: {
    password?: string[] | undefined;
    newPassword?: string[] | undefined;
    confirmationPassword?: string[] | undefined;
  };
};
