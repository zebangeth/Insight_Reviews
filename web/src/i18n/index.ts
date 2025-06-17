import type { SupportedLanguage } from "@/i18n/locale";
import { en } from "@/i18n/messages/en";
import { zh } from "@/i18n/messages/zh";

export type Messages = typeof en;

export function getMessages(language: SupportedLanguage): Messages {
  return (language === "zh" ? zh : en) as Messages;
}

export { en, zh };
