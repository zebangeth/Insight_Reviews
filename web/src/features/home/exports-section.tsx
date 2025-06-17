"use client";

import { FileSpreadsheet } from "lucide-react";

import { useTranslations } from "@/hooks/use-translations";

export function ExportsSection() {
  const t = useTranslations();
  const exports = t.home.exports;

  return (
    <section className="grid gap-8 border border-border bg-background p-6 md:grid-cols-[0.8fr_1.2fr] md:p-8">
      <div>
        <p className="text-sm font-semibold">{exports.title}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">{exports.heading}</h2>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          {exports.description}
        </p>
      </div>
      <div className="grid gap-3">
        {exports.files.map((file, index) => (
          <div
            key={file.file}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border border-border p-4"
          >
            <FileSpreadsheet className="size-7 text-emerald-600" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium">{file.file}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {file.date} · {file.count} {exports.reviewsUnit}
              </p>
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              {index === 0 ? exports.current : exports.archive}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
