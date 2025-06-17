"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Box,
  Check,
  ChevronRight,
  CircleX,
  Download,
  FileSpreadsheet,
  Megaphone,
  PackageCheck,
  Share2,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/use-translations";
import { useLanguage } from "@/providers/language-provider";

type RoleKey = "cx" | "product" | "supply" | "marketing";

const ROLE_ICONS = {
  cx: Users,
  product: Box,
  supply: Truck,
  marketing: Megaphone,
} as const;

export function HomePage() {
  const t = useTranslations();
  const { hero, steps, features, testimonials, demo, comparison, exports } = t.home;
  const [activeRole, setActiveRole] = useState<RoleKey>("cx");

  return (
    <div className="space-y-16">
      <section className="grid gap-10 lg:grid-cols-[310px_1fr] lg:items-start">
        <div className="pt-6">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-foreground" aria-hidden="true" />
            {hero.badge}
          </p>
          <h1 className="max-w-[12ch] text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-5xl">
            {hero.title}
          </h1>
          <p className="mt-5 max-w-sm text-base leading-7 text-muted-foreground">
            {hero.subtitle}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button asChild size="lg" className="h-11 rounded-md px-5">
              <Link href="/try">
                {hero.primaryCta}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 rounded-md border-border bg-background px-5"
            >
              <Link href="/pricing">{hero.secondaryCta}</Link>
            </Button>
          </div>

          <div className="mt-10 space-y-5 border-l border-border pl-5">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                <span className="absolute -left-[33px] flex size-6 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold">
                  {index + 1}
                </span>
                <p className="text-sm font-semibold">{step.title}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

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
                    <div key={label} className="flex items-center justify-between gap-3 border-b border-border px-3 py-3 last:border-0">
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
                            onClick={() => setActiveRole(roleKey)}
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
                    {demo.roles[activeRole].label}{demo.reportSuffix}
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
                  <span className="text-xs text-muted-foreground">
                    {demo.vsPriorPeriod}
                  </span>
                </div>
                <div className="overflow-hidden rounded-md border border-border">
                  {demo.themeRows.map((row, index) => (
                    <div key={row.label} className="grid grid-cols-[28px_1fr_70px] items-center gap-3 border-b border-border px-3 py-3 text-sm last:border-b-0">
                      <span className="text-xs text-muted-foreground">{index + 1}</span>
                      <div>
                        <p className="font-medium">{row.label}</p>
                        <div className="mt-2 h-1.5 rounded-full bg-muted">
                          <div className="h-full rounded-full bg-foreground" style={{ width: `${row.value * 3}%` }} />
                        </div>
                      </div>
                      <span className={row.sentiment === "down" ? "text-right text-xs text-red-600" : "text-right text-xs text-emerald-700"}>
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

        <div className="overflow-hidden rounded-lg border border-border bg-background lg:col-span-2">
          <div className="grid divide-y divide-border lg:grid-cols-[1fr_1fr_0.8fr] lg:divide-x lg:divide-y-0">
            <ComparisonPanel
              title={comparison.beforeTitle}
              description={comparison.beforeDescription}
              mode="before"
            />
            <ComparisonPanel
              title={comparison.afterTitle}
              description={comparison.afterDescription}
              mode="after"
            />

            <div className="p-5">
              <div className="flex h-full flex-col">
                <PackageCheck
                  className="size-10 shrink-0 rounded-full border border-border p-2.5"
                  aria-hidden="true"
                />
                <h2 className="mt-4 text-base font-semibold">
                  {comparison.ctaTitle}
                </h2>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  {comparison.ctaDescription}
                </p>
                <ul className="mt-4 space-y-2.5 text-xs text-muted-foreground">
                  {features.map((feature) => (
                    <li key={feature.title} className="flex gap-2">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-foreground" aria-hidden="true" />
                      <span>{feature.title}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-5 h-9 w-full rounded-md text-xs">
                  <Link href="/try">
                    {comparison.tryForFree}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Link href="/pricing" className="mt-3 inline-flex items-center gap-2 text-xs font-medium">
                  {comparison.viewPricing}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border py-10">
        <p className="text-center text-lg font-semibold tracking-tight text-foreground">
          {t.home.testimonialsSectionTitle}
        </p>
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.author} className="border border-border bg-background p-5">
              <div className="mb-5 flex h-12 items-center">
                {testimonial.logo ? (
                  <div className="relative h-10 w-36">
                    <Image
                      src={testimonial.logo}
                      alt={testimonial.author}
                      fill
                      sizes="144px"
                      className="object-contain object-left"
                    />
                  </div>
                ) : null}
              </div>
              <blockquote className="max-w-xl text-sm leading-6 text-foreground">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-5 text-xs font-medium text-muted-foreground">
                {testimonial.author}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="grid gap-8 border border-border bg-background p-6 md:grid-cols-[0.8fr_1.2fr] md:p-8">
        <div>
          <p className="text-sm font-semibold">{exports.title}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            {exports.heading}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            {exports.description}
          </p>
        </div>
        <div className="grid gap-3">
          {exports.files.map((file, index) => (
            <div key={file.file} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border border-border p-4">
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
    </div>
  );
}

function ComparisonPanel({
  title,
  description,
  mode,
}: {
  title: string;
  description: string;
  mode: "before" | "after";
}) {
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
                <div key={item.label} className="grid grid-cols-[minmax(0,1fr)_2rem] items-end gap-3">
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
