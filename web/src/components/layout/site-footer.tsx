"use client";

import { COPYRIGHT_NOTICE, FOOTER_COPY } from "@/config/site";
import { useLanguage } from "@/providers/language-provider";

export function SiteFooter() {
  const { language } = useLanguage();

  return (
    <footer className="mt-16 border-t border-border/60 bg-muted/30">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl leading-relaxed">{FOOTER_COPY[language]}</p>
        <p className="text-xs uppercase tracking-wide">{COPYRIGHT_NOTICE}</p>
      </div>
    </footer>
  );
}
