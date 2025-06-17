"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Download,
  FileSpreadsheet,
  Share2,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ROLE_ICONS, type RoleKey } from "@/features/home/constants";
import { useTranslations } from "@/hooks/use-translations";

type DemoDashboardProps = {
  activeRole: RoleKey;
  onRoleChange: (role: RoleKey) => void;
};

export function DemoDashboard({ activeRole, onRoleChange }: DemoDashboardProps) {
  const t = useTranslations();
  const demo = t.home.demo;

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background">
      <div className="grid border-b border-border lg:grid-cols-[1.05fr_0.95fr]">
        <div className="border-b border-border p-5 sm:p-6 lg:border-r lg:border-b-0">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold">{demo.uploadTitle}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {demo.supportedFormats}
              </p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
              {demo.validated}
            </span>
          </div>

          <div className="mt-5 grid gap-4 xl:grid-cols-[1.4fr_1fr]">
            <div className="flex min-h-[210px] flex-col items-center justify-center rounded-md border border-dashed border-border bg-muted/25 p-6 text-center">
              <FileSpreadsheet className="size-12 text-emerald-600" aria-hidden="true" />
              <p className="mt-4 text-sm font-medium">reviews_may_2024.xlsx</p>
              <p className="mt-1 text-xs text-muted-foreground">
                124 MB · 45,231 {demo.reviewsUnit}
              </p>
              <Button variant="outline" size="sm" className="mt-5 rounded-md">
                {demo.replaceFile}
              </Button>
            </div>

            <div className="rounded-md border border-border">
              {[
                [demo.fileReady, demo.validationsPassed],
                [demo.totalReviews, "45,231"],
                [demo.dateRange, "Apr 1 - May 14, 2024"],
                [demo.columnsDetected, "23"],
                [demo.language, demo.languageValue],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-3 border-b border-border px-3 py-3 last:border-0"
                >
                  <span className="flex items-center gap-2 text-xs font-medium">
                    <Check className="size-3.5 text-emerald-600" aria-hidden="true" />
                    {label}
                  </span>
                  <span className="text-right text-xs text-muted-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-5">
            <p className="text-sm font-semibold">{demo.configureTitle}</p>
            <div className="mt-4 space-y-4">
              <label className="block">
                <span className="text-xs font-medium">{demo.aiModel}</span>
                <div className="mt-2 flex h-10 items-center justify-between rounded-md border border-border px-3 text-sm">
                  Insight Reviews v1.3
                  <span className="text-xs text-muted-foreground">
                    {demo.recommended}
                  </span>
                </div>
              </label>

              <div>
                <p className="text-xs font-medium">{demo.reportFor}</p>
                <div className="mt-2 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                  {(Object.keys(ROLE_ICONS) as RoleKey[]).map((roleKey) => {
                    const role = demo.roles[roleKey];
                    const Icon = ROLE_ICONS[roleKey];
                    const active = activeRole === roleKey;

                    return (
                      <button
                        key={roleKey}
                        type="button"
                        onClick={() => onRoleChange(roleKey)}
                        className={
                          active
                            ? "flex flex-col items-center gap-1.5 rounded-md border border-foreground bg-background px-2 py-2.5 text-xs font-semibold"
                            : "flex flex-col items-center gap-1.5 rounded-md border border-border bg-background px-2 py-2.5 text-xs font-medium text-muted-foreground transition hover:border-foreground hover:text-foreground"
                        }
                      >
                        <Icon className="size-4 shrink-0" strokeWidth={2} aria-hidden="true" />
                        <span className="text-center leading-tight">{role.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="block">
                <span className="text-xs font-medium">{demo.primaryFocus}</span>
                <div className="mt-2 flex h-10 items-center justify-between rounded-md border border-border px-3 text-sm text-muted-foreground">
                  {demo.primaryFocusValue}
                  <ChevronRight className="size-4 rotate-90" aria-hidden="true" />
                </div>
              </label>

              <label className="block">
                <span className="text-xs font-medium">{demo.customQuestion}</span>
                <div className="mt-2 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground">
                  {demo.customQuestionValue}
                </div>
              </label>

              <Button className="rounded-md">
                {demo.analyzeButton}
                <Sparkles className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
            <div>
              <p className="text-lg font-semibold">
                {demo.roles[activeRole].label}
                {demo.reportSuffix}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                May 1 - May 14, 2024 · 45,231 {demo.reviewsUnit}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Download className="size-4" aria-hidden="true" />
              <Share2 className="size-4" aria-hidden="true" />
            </div>
          </div>

          <div className="mt-5 rounded-md bg-muted/35 p-4">
            <p className="text-sm font-semibold">{demo.executiveSummary}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {demo.summaryText}
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 border border-border sm:grid-cols-4">
            {[
              ["4.3", demo.averageRating, "+0.2"],
              ["68%", demo.positiveSentiment, "+6%"],
              ["12%", demo.negativeSentiment, "-3%"],
              ["91%", demo.responseRate, "+4%"],
            ].map(([value, label, delta], index) => (
              <div
                key={label}
                className="border-b border-r border-border p-4 nth-[2n]:border-r-0 sm:border-b-0 sm:nth-[2n]:border-r sm:last:border-r-0"
              >
                <p className="text-xs text-muted-foreground">{label}</p>
                <div className="mt-2">
                  <p className="text-2xl font-semibold leading-none tabular-nums">{value}</p>
                  <p
                    className={
                      index === 2
                        ? "mt-1 text-xs font-semibold leading-none text-red-600"
                        : "mt-1 text-xs font-semibold leading-none text-emerald-700"
                    }
                  >
                    {delta}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold">{demo.topThemes}</p>
              <span className="text-xs text-muted-foreground">{demo.vsPriorPeriod}</span>
            </div>
            <div className="overflow-hidden rounded-md border border-border">
              {demo.themeRows.map((row, index) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[28px_1fr_70px] items-center gap-3 border-b border-border px-3 py-3 text-sm last:border-b-0"
                >
                  <span className="text-xs text-muted-foreground">{index + 1}</span>
                  <div>
                    <p className="font-medium">{row.label}</p>
                    <div className="mt-2 h-1.5 rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-foreground"
                        style={{ width: `${row.value * 3}%` }}
                      />
                    </div>
                  </div>
                  <span
                    className={
                      row.sentiment === "down"
                        ? "text-right text-xs text-red-600"
                        : "text-right text-xs text-emerald-700"
                    }
                  >
                    {row.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Link href="/try" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
            {demo.viewFullReport}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
