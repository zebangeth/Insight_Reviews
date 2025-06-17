"use client";

import Link from "next/link";
import { ArrowRight, Check, PackageCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ComparisonPanel } from "@/features/home/comparison-panel";
import { useTranslations } from "@/hooks/use-translations";

export function ComparisonSection() {
  const t = useTranslations();
  const { features, comparison } = t.home;

  return (
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
            <h2 className="mt-4 text-base font-semibold">{comparison.ctaTitle}</h2>
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
  );
}
