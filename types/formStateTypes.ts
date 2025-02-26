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
