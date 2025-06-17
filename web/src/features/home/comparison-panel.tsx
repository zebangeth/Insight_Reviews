"use client";

import { CircleX } from "lucide-react";

import { useTranslations } from "@/hooks/use-translations";
import { useLanguage } from "@/providers/language-provider";

type ComparisonPanelProps = {
  title: string;
  description: string;
  mode: "before" | "after";
};

export function ComparisonPanel({ title, description, mode }: ComparisonPanelProps) {
  const t = useTranslations();
  const { language } = useLanguage();
  const { comparison } = t.home;

  return (
    <div className="flex h-full min-w-0 flex-col p-5">
      <p className="text-base font-semibold">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      {mode === "before" ? (
        <div className="mt-4 flex flex-1 flex-col gap-3">
          <div className="min-w-0 overflow-hidden border border-border bg-background">
            <div className="overflow-hidden">
              <table className="w-full table-fixed border-collapse text-[10px]">
                <colgroup>
                  <col className="w-[18%]" />
                  <col className="w-[16%]" />
                  <col className="w-[28%]" />
                  <col className="w-[38%]" />
                </colgroup>
                <thead>
                  <tr className="border-b border-border bg-muted/25 text-muted-foreground">
                    {[
                      comparison.tableHeaders.reviewId,
                      comparison.tableHeaders.rating,
                      comparison.tableHeaders.title,
                      comparison.tableHeaders.reviewText,
                    ].map((header) => (
                      <th key={header} className="px-3 py-2 text-left font-medium">
                        <span className="block truncate">{header}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {comparison.tableRows.map((row) => (
                    <tr key={row.id} className="border-b border-border/70 last:border-b-0">
                      {[row.id, row.rating, row.title, row.review].map((cell, cellIndex) => (
                        <td key={`${row.id}-${cellIndex}`} className="px-3 py-2.5 align-middle">
                          <span
                            className={
                              cellIndex >= 2
                                ? "block truncate"
                                : "block whitespace-nowrap tabular-nums"
                            }
                          >
                            {cell}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-border/70 px-3 py-1.5">
              <div className="h-1.5 w-3/5 rounded-full bg-muted-foreground/25" />
            </div>
          </div>
          <ul className="grid gap-1.5 text-xs text-muted-foreground sm:grid-cols-2">
            {comparison.painPoints.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <CircleX className="mt-0.5 size-3.5 shrink-0 text-foreground" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-4 grid flex-1 gap-3 sm:grid-cols-[0.75fr_1.25fr]">
          <div className="border border-border p-3.5">
            <p className="text-sm font-semibold">{comparison.keyInsight}</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              {comparison.keyInsightText}
            </p>
            <div className="mt-3 border-t border-border pt-3">
              <p className="text-sm font-semibold">{comparison.topAction}</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {comparison.topActionText}
              </p>
            </div>
          </div>
          <div className="min-w-0 border border-border p-3.5">
            <p
              className={
                language === "zh"
                  ? "text-xs font-semibold"
                  : "text-xs font-semibold uppercase tracking-[0.12em]"
              }
            >
              {comparison.csatImpactTitle}
            </p>
            <div className="mt-3 space-y-2.5">
              {comparison.csatThemes.map((item) => (
                <div
                  key={item.label}
                  className="grid grid-cols-[minmax(0,1fr)_2rem] items-end gap-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium">{item.label}</p>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-foreground"
                        style={{ width: `${item.width}%` }}
                      />
                    </div>
                  </div>
                  <span className="pb-0.5 text-right text-xs font-semibold tabular-nums">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
