"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Box,
  Check,
  ChevronRight,
  Download,
  FileSpreadsheet,
  Megaphone,
  PackageCheck,
  Share2,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";

import {
  HOME_FEATURES,
  HOME_HERO,
  HOME_STEPS,
  HOME_TESTIMONIALS,
} from "@/content/home";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/providers/language-provider";

type RoleKey = "cx" | "product" | "supply" | "marketing";

const REPORT_ROLES = {
  cx: {
    icon: Users,
    label: { en: "CX Leader", zh: "客服负责人" },
    helper: {
      en: "Customer experience & support",
      zh: "客户体验与服务支持",
    },
  },
  product: {
    icon: Box,
    label: { en: "Product Manager", zh: "产品经理" },
    helper: { en: "Product & feature insights", zh: "产品与功能洞察" },
  },
  supply: {
    icon: Truck,
    label: { en: "Supply Chain Lead", zh: "供应链负责人" },
    helper: { en: "Operations & logistics", zh: "履约与物流" },
  },
  marketing: {
    icon: Megaphone,
    label: { en: "Marketing Leader", zh: "市场负责人" },
    helper: { en: "Brand & customer voice", zh: "品牌与用户声音" },
  },
} satisfies Record<
  RoleKey,
  {
    icon: typeof Users;
    label: Record<"en" | "zh", string>;
    helper: Record<"en" | "zh", string>;
  }
>;

const THEME_ROWS = [
  { theme: "Shipping & Delivery", value: 24, sentiment: "up" },
  { theme: "Product Quality", value: 19, sentiment: "up" },
  { theme: "Customer Service", value: 16, sentiment: "flat" },
  { theme: "Packaging", value: 11, sentiment: "down" },
  { theme: "Value for Money", value: 9, sentiment: "flat" },
];

const REVIEW_FILES = [
  { file: "reviews_may_2024.xlsx", date: "May 14, 2024", count: "45,231" },
  { file: "reviews_apr_2024.xlsx", date: "Apr 14, 2024", count: "38,901" },
  { file: "reviews_mar_2024.xlsx", date: "Mar 14, 2024", count: "41,302" },
];

export function HomePage() {
  const { language } = useLanguage();
  const hero = HOME_HERO[language];
  const features = HOME_FEATURES[language];
  const steps = HOME_STEPS[language];
  const testimonials = HOME_TESTIMONIALS[language];
  const [activeRole, setActiveRole] = useState<RoleKey>("cx");

  return (
    <div className="space-y-16">
      <section className="grid gap-10 lg:grid-cols-[310px_1fr] lg:items-start">
        <div className="pt-6 lg:sticky lg:top-24">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-foreground" aria-hidden="true" />
            {language === "zh" ? "AI 评价洞察工作台" : "AI review intelligence workspace"}
          </p>
          <h1 className="max-w-[12ch] text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-5xl">
            {language === "zh" ? "从评价导出到业务决策。" : "From review exports to decisions."}
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
                  <p className="text-sm font-semibold">
                    {language === "zh" ? "上传评价导出文件" : "Upload review export"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {language === "zh" ? "支持 .xlsx 文件" : "Supported formats: .xlsx"}
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                  {language === "zh" ? "已校验" : "Validated"}
                </span>
              </div>

              <div className="mt-5 grid gap-4 xl:grid-cols-[1.4fr_1fr]">
                <div className="flex min-h-[210px] flex-col items-center justify-center rounded-md border border-dashed border-border bg-muted/25 p-6 text-center">
                  <FileSpreadsheet className="size-12 text-emerald-600" aria-hidden="true" />
                  <p className="mt-4 text-sm font-medium">reviews_may_2024.xlsx</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    124 MB · 45,231 {language === "zh" ? "条评价" : "reviews"}
                  </p>
                  <Button variant="outline" size="sm" className="mt-5 rounded-md">
                    {language === "zh" ? "替换文件" : "Replace file"}
                  </Button>
                </div>

                <div className="rounded-md border border-border">
                  {[
                    [language === "zh" ? "文件状态" : "File ready", language === "zh" ? "校验通过" : "All validations passed"],
                    [language === "zh" ? "总评价数" : "Total reviews", "45,231"],
                    [language === "zh" ? "日期范围" : "Date range", "Apr 1 - May 14, 2024"],
                    [language === "zh" ? "字段识别" : "Columns detected", "23"],
                    [language === "zh" ? "语言" : "Language", language === "zh" ? "中文 / 英文" : "zh / en"],
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
                <p className="text-sm font-semibold">
                  {language === "zh" ? "配置分析" : "Configure analysis"}
                </p>
                <div className="mt-4 space-y-4">
                  <label className="block">
                    <span className="text-xs font-medium">
                      {language === "zh" ? "AI 模型" : "AI model"}
                    </span>
                    <div className="mt-2 flex h-10 items-center justify-between rounded-md border border-border px-3 text-sm">
                      Insight Reviews v1.3
                      <span className="text-xs text-muted-foreground">
                        {language === "zh" ? "推荐" : "Recommended"}
                      </span>
                    </div>
                  </label>

                  <div>
                    <p className="text-xs font-medium">
                      {language === "zh" ? "这份报告给谁看？" : "Who is this report for?"}
                    </p>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                      {(Object.keys(REPORT_ROLES) as RoleKey[]).map((roleKey) => {
                        const role = REPORT_ROLES[roleKey];
                        const Icon = role.icon;
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
                            <span className="text-center leading-tight">{role.label[language]}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <label className="block">
                    <span className="text-xs font-medium">
                      {language === "zh" ? "主要关注" : "Primary focus"}
                    </span>
                    <div className="mt-2 flex h-10 items-center justify-between rounded-md border border-border px-3 text-sm text-muted-foreground">
                      {language === "zh" ? "客户体验与服务支持" : "Customer experience & support"}
                      <ChevronRight className="size-4 rotate-90" aria-hidden="true" />
                    </div>
                  </label>

                  <label className="block">
                    <span className="text-xs font-medium">
                      {language === "zh" ? "自定义问题" : "Custom question"}
                    </span>
                    <div className="mt-2 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground">
                      {language === "zh"
                        ? "退款流程的主要阻力是什么？如何降低投诉？"
                        : "What are the top drivers of refund requests and how can we reduce them?"}
                    </div>
                  </label>

                  <Button className="rounded-md">
                    {language === "zh" ? "分析评价" : "Analyze reviews"}
                    <Sparkles className="size-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                <div>
                  <p className="text-lg font-semibold">
                    {REPORT_ROLES[activeRole].label[language]} {language === "zh" ? "报告" : "Report"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    May 1 - May 14, 2024 · 45,231 {language === "zh" ? "条评价" : "reviews"}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Download className="size-4" aria-hidden="true" />
                  <Share2 className="size-4" aria-hidden="true" />
                </div>
              </div>

              <div className="mt-5 rounded-md bg-muted/35 p-4">
                <p className="text-sm font-semibold">
                  {language === "zh" ? "执行摘要" : "Executive summary"}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {language === "zh"
                    ? "整体情绪较上一周期提升 6%。物流延迟与退款流程摩擦仍是影响满意度的主要因素。"
                    : "Overall sentiment improved 6% vs prior period. Shipping delays and refund process friction continue to impact satisfaction the most."}
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 border border-border sm:grid-cols-4">
                {[
                  ["4.3", language === "zh" ? "平均评分" : "Average rating", "+0.2"],
                  ["68%", language === "zh" ? "正向情绪" : "Positive sentiment", "+6%"],
                  ["12%", language === "zh" ? "负向情绪" : "Negative sentiment", "-3%"],
                  ["91%", language === "zh" ? "响应率" : "Response rate", "+4%"],
                ].map(([value, label, delta], index) => (
                  <div
                    key={label}
                    className="border-b border-r border-border p-4 nth-[2n]:border-r-0 sm:border-b-0 sm:nth-[2n]:border-r sm:last:border-r-0"
                  >
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <div className="mt-2 flex h-8 items-center gap-1.5">
                      <span className="text-2xl font-semibold leading-none tabular-nums">{value}</span>
                      <span
                        className={
                          index === 2
                            ? "text-[11px] font-semibold leading-none text-red-600"
                            : "text-[11px] font-semibold leading-none text-emerald-700"
                        }
                      >
                        {delta}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold">
                    {language === "zh" ? "高影响主题" : "Top themes by impact"}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {language === "zh" ? "较上一周期" : "vs prior period"}
                  </span>
                </div>
                <div className="overflow-hidden rounded-md border border-border">
                  {THEME_ROWS.map((row, index) => (
                    <div key={row.theme} className="grid grid-cols-[28px_1fr_70px] items-center gap-3 border-b border-border px-3 py-3 text-sm last:border-b-0">
                      <span className="text-xs text-muted-foreground">{index + 1}</span>
                      <div>
                        <p className="font-medium">{row.theme}</p>
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
                {language === "zh" ? "查看完整报告" : "View full report"}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="grid divide-y divide-border lg:grid-cols-[1fr_1fr_0.8fr] lg:items-stretch lg:divide-x lg:divide-y-0">
            <ComparisonPanel
              title={language === "zh" ? "之前：人工表格整理" : "Before: Spreadsheet triage"}
              description={language === "zh" ? "手动筛选、分类、复制证据。" : "Manual, inconsistent, time-consuming."}
              mode="before"
            />
            <ComparisonPanel
              title={language === "zh" ? "之后：角色就绪报告" : "After: Stakeholder-ready report"}
              description={language === "zh" ? "AI 将评价转化为清晰洞察与行动。" : "AI turns reviews into clear insights and actions."}
              mode="after"
            />
            <div className="flex h-full flex-col p-6">
              <PackageCheck className="size-9 rounded-full border border-border p-2" aria-hidden="true" />
              <h2 className="mt-4 text-xl font-semibold">
                {language === "zh" ? "几分钟内开始分析" : "Start your analysis in minutes"}
              </h2>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                {features.map((feature) => (
                  <li key={feature.title} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-foreground" aria-hidden="true" />
                    <span>{feature.title}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-6 rounded-md">
                <Link href="/try">
                  {language === "zh" ? "免费体验" : "Try for free"}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border py-10">
        <p className="text-center text-sm font-medium text-muted-foreground">
          {language === "zh" ? "真实电商团队正在使用" : "Trusted by ecommerce teams"}
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.author} className="border border-border bg-background p-6">
              {testimonial.logo ? (
                <div className="relative mb-6 h-12 w-36">
                  <Image
                    src={testimonial.logo}
                    alt={testimonial.author}
                    fill
                    sizes="144px"
                    className="object-contain object-left"
                  />
                </div>
              ) : null}
              <blockquote className="text-base leading-7 text-foreground">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-5 text-sm font-medium text-muted-foreground">
                {testimonial.author}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="grid gap-8 border border-border bg-background p-6 md:grid-cols-[0.8fr_1.2fr] md:p-8">
        <div>
          <p className="text-sm font-semibold">
            {language === "zh" ? "兼容现有导出流程" : "Works with your existing exports"}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            {language === "zh" ? "无需重建数据管道。" : "No new data pipeline required."}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            {language === "zh"
              ? "继续使用淘宝、天猫等导出格式。Insight Reviews 负责字段识别、清洗、聚类和角色化报告。"
              : "Keep using Taobao, Tmall, and browser-extension exports. Insight Reviews handles validation, clustering, and stakeholder-ready summaries."}
          </p>
        </div>
        <div className="grid gap-3">
          {REVIEW_FILES.map((file, index) => (
            <div key={file.file} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border border-border p-4">
              <FileSpreadsheet className="size-7 text-emerald-600" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium">{file.file}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {file.date} · {file.count} {language === "zh" ? "条评价" : "reviews"}
                </p>
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {index === 0 ? (language === "zh" ? "当前" : "Current") : (language === "zh" ? "历史" : "Archive")}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const BEFORE_TABLE_ROWS = [
  ["1001", "2", "Late delivery", "My order arrived 5 days late and no one responded..."],
  ["1002", "1", "Packaging", "Box was crushed and item inside was damaged..."],
  ["1003", "3", "Refund process", "Requested a refund but still waiting after 10 days..."],
  ["1004", "2", "Product quality", "Item quality doesn't match the listing photos..."],
] as const;

function ComparisonPanel({
  title,
  description,
  mode,
}: {
  title: string;
  description: string;
  mode: "before" | "after";
}) {
  return (
    <div className="flex h-full min-w-0 flex-col p-6">
      <p className="text-lg font-semibold">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      {mode === "before" ? (
        <div className="mt-5 flex min-h-[300px] flex-1 flex-col overflow-hidden border border-border text-[11px]">
          <table className="h-full w-full table-fixed border-collapse">
            <colgroup>
              <col className="w-[14%]" />
              <col className="w-[10%]" />
              <col className="w-[22%]" />
              <col className="w-[54%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-border bg-muted/20">
                {["Review ID", "Rating", "Topic", "Review Text"].map((header) => (
                  <th
                    key={header}
                    className="border-r border-border px-3 py-3 text-left font-medium last:border-r-0"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="h-full text-muted-foreground">
              {BEFORE_TABLE_ROWS.map((row) => (
                <tr key={row[0]} className="border-b border-border">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`${row[0]}-${cellIndex}`}
                      className="border-r border-border px-3 py-3 align-middle last:border-r-0"
                    >
                      <span
                        className={
                          cellIndex === 3 ? "block truncate" : "block whitespace-nowrap"
                        }
                      >
                        {cell}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
              <tr aria-hidden="true" className="h-full">
                <td colSpan={4} className="p-0" />
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-5 grid min-h-[300px] flex-1 min-w-0 gap-4 sm:grid-cols-2">
          <div className="min-w-0 overflow-hidden border border-border p-4">
            <p className="text-xs font-semibold">Key insight</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Delivery delay is the top driver of dissatisfaction, impacting CSAT by -14 points.
            </p>
          </div>
          <div className="min-w-0 overflow-hidden border border-border p-4">
            <p className="text-xs font-semibold">Impact on CSAT</p>
            <div className="mt-3 space-y-3">
              {[
                { label: "Delivery delay", value: 82 },
                { label: "Packaging damage", value: 58 },
                { label: "Refund friction", value: 36 },
              ].map((item) => (
                <div key={item.label} className="min-w-0 space-y-1.5 text-xs">
                  <span className="block">{item.label}</span>
                  <div className="h-2 w-full max-w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full max-w-full rounded-full bg-foreground"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
