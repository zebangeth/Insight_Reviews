import type { SupportedLanguage } from "@/providers/language-provider";

export const SITE_NAME = "Insight Reviews";
export const SITE_DESCRIPTION =
  "LLM-powered insights that help e-commerce teams turn customer reviews into strategy.";

export const SITE_TAGLINE: Record<SupportedLanguage, string> = {
  en: "AI insights for e-commerce teams",
  zh: "为电商团队打造的智能评价洞察",
};

export const SUPPORTED_LANGUAGES: ReadonlyArray<{
  value: SupportedLanguage;
  label: string;
}> = [
  { value: "en", label: "English (beta)" },
  { value: "zh", label: "简体中文" },
];

export const NAV_LINKS: Record<
  SupportedLanguage,
  ReadonlyArray<{ href: string; label: string }>
> = {
  en: [
    { href: "/", label: "Home" },
    { href: "/try", label: "Try" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
  ],
  zh: [
    { href: "/", label: "主页" },
    { href: "/try", label: "体验" },
    { href: "/pricing", label: "定价" },
    { href: "/contact", label: "信息" },
  ],
};

export const FOOTER_COPY: Record<SupportedLanguage, string> = {
  en: "This site is a functional demo of the commercial Insight Reviews platform. Contact us for production access.",
  zh: "此站点仅作为 Insight Reviews 商业版的功能演示。如需正式版接入，请联系我们。",
};

export const COPYRIGHT_NOTICE = "© 2024 Insight Reviews";
