"use client";

import { getMessages, type Messages } from "@/i18n";
import { useLanguage } from "@/providers/language-provider";

export function useTranslations(): Messages {
  const { language } = useLanguage();
  return getMessages(language);
}
