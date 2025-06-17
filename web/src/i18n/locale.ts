export type SupportedLanguage = "en" | "zh";

export const STORAGE_KEY = "insight-reviews.language";

export const SUPPORTED_LANGUAGES: ReadonlyArray<{
  value: SupportedLanguage;
  label: string;
}> = [
  { value: "en", label: "EN" },
  { value: "zh", label: "中文" },
];
