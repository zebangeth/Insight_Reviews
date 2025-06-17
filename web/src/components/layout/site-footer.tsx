"use client";

import { useTranslations } from "@/hooks/use-translations";

export function SiteFooter() {
  const t = useTranslations();

  return (
    <footer className="mt-20 border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="max-w-2xl leading-relaxed">{t.common.footer}</p>
        <p className="text-xs uppercase tracking-[0.18em]">{t.common.copyright}</p>
      </div>
    </footer>
  );
}
