"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/use-translations";

export function HeroSection() {
  const t = useTranslations();
  const { hero, steps } = t.home;

  return (
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
  );
}
