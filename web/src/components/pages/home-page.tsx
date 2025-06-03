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
    label: { en: "CX Leader", zh: "客服团队" },
    helper: {
      en: "Customer experience & support",
      zh: "客户体验与售后支持",
    },
  },
  product: {
    icon: Box,
    label: { en: "Product Manager", zh: "产品经理" },
    helper: { en: "Product & feature insights", zh: "产品与功能洞察" },
  },
  supply: {
    icon: Truck,
    label: { en: "Supply Chain Lead", zh: "供应链团队" },
    helper: { en: "Operations & logistics", zh: "履约与物流" },
  },
  marketing: {
    icon: Megaphone,
    label: { en: "Marketing Leader", zh: "市场团队" },
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
  { label: { en: "Shipping & Delivery", zh: "发货与物流" }, value: 24, sentiment: "up" },
  { label: { en: "Product Quality", zh: "产品质量" }, value: 19, sentiment: "up" },
  { label: { en: "Customer Service", zh: "客服响应" }, value: 16, sentiment: "flat" },
  { label: { en: "Packaging", zh: "包装体验" }, value: 11, sentiment: "down" },
  { label: { en: "Value for Money", zh: "性价比" }, value: 9, sentiment: "flat" },
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
        <div className="pt-6">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-foreground" aria-hidden="true" />
            {language === "zh" ? "AI 评价分析工作台" : "AI review intelligence workspace"}
          </p>
          <h1 className="max-w-[12ch] text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-5xl">
            {language === "zh" ? "把评价导出，变成决策依据。" : "From review exports to decisions."}
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
                    {language === "zh" ? "上传评价文件" : "Upload review export"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {language === "zh" ? "支持 .xlsx 导出文件" : "Supported formats: .xlsx"}
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                  {language === "zh" ? "校验通过" : "Validated"}
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
                    {language === "zh" ? "重新上传" : "Replace file"}
                  </Button>
                </div>

                <div className="rounded-md border border-border">
                  {[
                    [language === "zh" ? "文件状态" : "File ready", language === "zh" ? "字段已通过校验" : "Validations passed"],
                    [language === "zh" ? "有效评价" : "Total reviews", "45,231"],
                    [language === "zh" ? "日期范围" : "Date range", "Apr 1 - May 14, 2024"],
                    [language === "zh" ? "识别字段" : "Columns detected", "23"],
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
                  {language === "zh" ? "设置分析条件" : "Configure analysis"}
                </p>
                <div className="mt-4 space-y-4">
                  <label className="block">
                    <span className="text-xs font-medium">
                      {language === "zh" ? "AI 模型" : "AI model"}
                    </span>
                    <div className="mt-2 flex h-10 items-center justify-between rounded-md border border-border px-3 text-sm">
                      Insight Reviews v1.3
                      <span className="text-xs text-muted-foreground">
                        {language === "zh" ? "推荐使用" : "Recommended"}
                      </span>
                    </div>
                  </label>

                  <div>
                    <p className="text-xs font-medium">
                      {language === "zh" ? "选择报告视角" : "Who is this report for?"}
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
                      {language === "zh" ? "分析重点" : "Primary focus"}
                    </span>
                    <div className="mt-2 flex h-10 items-center justify-between rounded-md border border-border px-3 text-sm text-muted-foreground">
                      {language === "zh" ? "客户体验与售后支持" : "Customer experience & support"}
                      <ChevronRight className="size-4 rotate-90" aria-hidden="true" />
                    </div>
                  </label>

                  <label className="block">
                    <span className="text-xs font-medium">
                      {language === "zh" ? "自定义问题" : "Custom question"}
                    </span>
                    <div className="mt-2 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground">
                      {language === "zh"
                        ? "退款申请集中在哪些问题？应该先优化什么？"
                        : "What are the top drivers of refund requests and how can we reduce them?"}
                    </div>
                  </label>

                  <Button className="rounded-md">
                    {language === "zh" ? "开始分析" : "Analyze reviews"}
                    <Sparkles className="size-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                <div>
                  <p className="text-lg font-semibold">
                    {REPORT_ROLES[activeRole].label[language]}{language === "zh" ? "报告" : " Report"}
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
                  {language === "zh" ? "报告摘要" : "Executive summary"}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {language === "zh"
                    ? "整体满意度较上一周期提升 6%。物流延迟和退款流程仍是影响体验的主要问题。"
                    : "Overall sentiment improved 6% vs prior period. Shipping delays and refund process friction continue to impact satisfaction the most."}
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 border border-border sm:grid-cols-4">
                {[
                  ["4.3", language === "zh" ? "平均评分" : "Average rating", "+0.2"],
                  ["68%", language === "zh" ? "正向反馈" : "Positive sentiment", "+6%"],
                  ["12%", language === "zh" ? "负向反馈" : "Negative sentiment", "-3%"],
                  ["91%", language === "zh" ? "响应率" : "Response rate", "+4%"],
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
                  <p className="text-sm font-semibold">
                    {language === "zh" ? "影响最大的主题" : "Top themes by impact"}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {language === "zh" ? "较上一周期" : "vs prior period"}
                  </span>
                </div>
                <div className="overflow-hidden rounded-md border border-border">
                  {THEME_ROWS.map((row, index) => (
                    <div key={row.label.en} className="grid grid-cols-[28px_1fr_70px] items-center gap-3 border-b border-border px-3 py-3 text-sm last:border-b-0">
                      <span className="text-xs text-muted-foreground">{index + 1}</span>
                      <div>
                        <p className="font-medium">{row.label[language]}</p>
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

        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-background lg:col-span-2">
          <div className="grid divide-y divide-border lg:grid-cols-[1fr_1fr_0.8fr] lg:divide-x lg:divide-y-0">
            <ComparisonPanel
              title={language === "zh" ? "之前：人工表格整理" : "Before: Spreadsheet triage"}
              description={
                language === "zh" ? "筛选、分类、找证据都靠人工。" : "Manual, inconsistent, time-consuming."
              }
              mode="before"
              language={language}
            />
            <ComparisonPanel
              title={language === "zh" ? "之后：按角色生成报告" : "After: Stakeholder-ready report"}
              description={
                language === "zh"
                  ? "评价自动转成洞察、证据和行动建议。"
                  : "AI turns reviews into clear insights and actions."
              }
              mode="after"
              language={language}
            />

            <div className="p-5">
              <div className="flex h-full flex-col">
                <PackageCheck
                  className="size-10 shrink-0 rounded-full border border-border p-2.5"
                  aria-hidden="true"
                />
                <h2 className="mt-4 text-base font-semibold">
                  {language === "zh" ? "几分钟内得到第一份报告" : "Start your analysis in minutes"}
                </h2>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  {language === "zh"
                    ? "无需信用卡，先预览一份分析结果。"
                    : "No credit card required. Get a preview report instantly."}
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
                    {language === "zh" ? "开始体验" : "Try for free"}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Link href="/pricing" className="mt-3 inline-flex items-center gap-2 text-xs font-medium">
                  {language === "zh" ? "查看定价" : "View pricing"}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border py-10">
        <p className="text-center text-lg font-semibold tracking-tight text-foreground">
          {language === "zh" ? "真实电商团队的反馈" : "Trusted by ecommerce teams"}
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
          <p className="text-sm font-semibold">
            {language === "zh" ? "沿用现有导出流程" : "Works with your existing exports"}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            {language === "zh" ? "不需要重建数据管道。" : "No new data pipeline required."}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            {language === "zh"
              ? "继续使用淘宝、天猫等平台导出的评价表。Insight Reviews 负责字段识别、清洗、聚类和报告生成。"
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
  {
    id: "1001",
    rating: "2",
    title: { en: "Late delivery", zh: "发货延迟" },
    review: { en: "Arrived 5 days late", zh: "晚到 5 天" },
  },
  {
    id: "1002",
    rating: "1",
    title: { en: "Damaged item", zh: "商品破损" },
    review: { en: "Box was crushed", zh: "包装被压坏" },
  },
  {
    id: "1003",
    rating: "3",
    title: { en: "Too small", zh: "尺码偏小" },
    review: { en: "Size runs small", zh: "实物尺码偏小" },
  },
] as const;

const AFTER_CSAT_THEMES = [
  { label: { en: "Delivery delay", zh: "发货延迟" }, value: -14, width: 100 },
  { label: { en: "Packaging damage", zh: "包装破损" }, value: -9, width: 72 },
  { label: { en: "Size mismatch", zh: "尺码不符" }, value: -6, width: 56 },
  { label: { en: "Refund friction", zh: "退款阻力" }, value: -5, width: 45 },
  { label: { en: "Product quality", zh: "产品质量" }, value: -4, width: 36 },
] as const;

const BEFORE_PAIN_POINTS = [
  { en: "Hours of manual filtering", zh: "人工筛选耗时" },
  { en: "Hard to spot what matters", zh: "重点问题难发现" },
  { en: "No role-specific view", zh: "缺少团队视角" },
  { en: "Slow to share and act", zh: "分享和行动都慢" },
] as const;

function ComparisonPanel({
  title,
  description,
  mode,
  language,
}: {
  title: string;
  description: string;
  mode: "before" | "after";
  language: "en" | "zh";
}) {
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
                      language === "zh" ? "评价 ID" : "Review ID",
                      language === "zh" ? "评分" : "Rating",
                      language === "zh" ? "主题" : "Title",
                      language === "zh" ? "评价内容" : "Review Text",
                    ].map((header) => (
                      <th key={header} className="px-3 py-2 text-left font-medium">
                        <span className="block truncate">{header}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {BEFORE_TABLE_ROWS.map((row) => (
                    <tr key={row.id} className="border-b border-border/70 last:border-b-0">
                      {[row.id, row.rating, row.title[language], row.review[language]].map((cell, cellIndex) => (
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
            {BEFORE_PAIN_POINTS.map((point) => (
              <li key={point.en} className="flex items-start gap-2">
                <CircleX className="mt-0.5 size-3.5 shrink-0 text-foreground" aria-hidden="true" />
                <span>{point[language]}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-4 grid flex-1 gap-3 sm:grid-cols-[0.75fr_1.25fr]">
          <div className="border border-border p-3.5">
            <p className="text-sm font-semibold">
              {language === "zh" ? "关键洞察" : "Key insight"}
            </p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              {language === "zh"
                ? "发货延迟是满意度下降的主要原因，对 CSAT 影响约 -14 分。"
                : "Delivery delay is the top driver of dissatisfaction, impacting CSAT by -14 points."}
            </p>
            <div className="mt-3 border-t border-border pt-3">
              <p className="text-sm font-semibold">
                {language === "zh" ? "优先动作" : "Top action"}
              </p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {language === "zh"
                  ? "先提升预计送达时间准确性，并主动同步物流变化。"
                  : "Improve delivery ETA accuracy and provide proactive updates."}
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
              {language === "zh" ? "各主题对 CSAT 的影响" : "Impact on CSAT by theme"}
            </p>
            <div className="mt-3 space-y-2.5">
              {AFTER_CSAT_THEMES.map((item) => (
                <div key={item.label.en} className="grid grid-cols-[minmax(0,1fr)_2rem] items-end gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium">{item.label[language]}</p>
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
