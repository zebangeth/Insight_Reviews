"use client";

import Image from "next/image";
import Link from "next/link";

import {
  HOME_FEATURES,
  HOME_HERO,
  HOME_PLATFORM_SECTION,
  HOME_STEPS,
  HOME_TESTIMONIALS,
} from "@/content/home";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/providers/language-provider";

export function HomePage() {
  const { language } = useLanguage();
  const hero = HOME_HERO[language];
  const features = HOME_FEATURES[language];
  const steps = HOME_STEPS[language];
  const testimonials = HOME_TESTIMONIALS[language];
  const platform = HOME_PLATFORM_SECTION[language];

  return (
    <div className="space-y-20">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/60 px-8 py-16 shadow-xl backdrop-blur">
        <div className="max-w-3xl space-y-6">
          <Badge className="bg-primary/15 text-primary">
            {language === "zh" ? "AI 驱动的评价洞察" : "AI-powered review insights"}
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {hero.title}
          </h1>
          <p className="text-lg text-muted-foreground sm:text-xl">
            {hero.subtitle}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/try">{hero.primaryCta}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/pricing">{hero.secondaryCta}</Link>
            </Button>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4 text-sm text-muted-foreground sm:text-base">
          {features.slice(0, 2).map((feature, idx) => (
            <div
              key={feature.title}
              className="flex-1 min-w-[220px] rounded-2xl border border-dashed border-border/60 bg-background/60 p-4"
            >
              <p className="font-medium text-primary/90">
                {idx === 0 ? "⏱️" : "🧩"} {feature.title}
              </p>
              <p className="mt-2 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-[2fr_3fr]">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">
            {language === "zh" ? "为何选择 Insight Reviews" : "Why teams choose Insight Reviews"}
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            {language === "zh"
              ? "我们将人工处理的经验沉淀为提示词模板，结合角色视角和重点维度，帮助跨职能团队快速达成共识。"
              : "Hard-earned review analysis heuristics are codified into prompt packs so cross-functional teams align without spreadsheets."}
          </p>
          <Separator />
          <ul className="space-y-5">
            {features.map((feature, index) => (
              <li key={feature.title} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg text-primary">
                  {(["⚡", "🎯", "🌏"] as const)[index % 3]}
                </span>
                <div>
                  <p className="text-base font-medium">{feature.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-6">
          {steps.map((step, index) => (
            <Card
              key={step.title}
              className="border-border/70 bg-background/70 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-base font-semibold text-primary">
                    {index + 1}
                  </span>
                  {step.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {step.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 rounded-3xl border border-border/60 bg-background/70 p-6 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{platform.title}</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            {platform.description}
          </p>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-4">
          <Image
            src="/images/Supported_EC_Sites.png"
            alt={platform.imageAlt}
            width={1080}
            height={640}
            className="h-auto w-full object-contain"
            priority
          />
        </div>
      </section>

      <section className="space-y-6 rounded-3xl border border-border/60 bg-background/70 px-6 py-10">
        <h2 className="text-2xl font-semibold">
          {language === "zh" ? "来自伙伴的反馈" : "Trusted by ecommerce teams"}
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.quote} className="h-full bg-card/80">
              <CardHeader className="space-y-4">
                {testimonial.logo ? (
                  <div className="relative h-12 w-32">
                    <Image
                      src={testimonial.logo}
                      alt={testimonial.author}
                      fill
                      sizes="128px"
                      className="object-contain"
                    />
                  </div>
                ) : null}
                <CardDescription className="text-base leading-relaxed">
                  “{testimonial.quote}”
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-semibold text-primary/80">
                  {testimonial.author}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

    </div>
  );
}
