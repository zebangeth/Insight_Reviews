"use client";

import { COPYRIGHT_NOTICE, FOOTER_COPY } from "@/config/site";
import { useLanguage } from "@/providers/language-provider";

export function SiteFooter() {
  const { language } = useLanguage();

  return (
    <footer className="mt-20 border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="max-w-2xl leading-relaxed">{FOOTER_COPY[language]}</p>
        <p className="text-xs uppercase tracking-[0.18em]">{COPYRIGHT_NOTICE}</p>
      </div>
    </footer>
  );
}
