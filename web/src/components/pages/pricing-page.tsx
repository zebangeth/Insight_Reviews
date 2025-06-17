"use client";

import Link from "next/link";
import { ArrowRight, Building2, Cloud, ServerCog } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "@/hooks/use-translations";

const PLAN_ICONS = [Cloud, ServerCog, Building2] as const;

export function PricingPage() {
  const t = useTranslations();

  return (
    <div className="space-y-10">
      <header className="border-b border-border pb-10">
        <p className="text-sm font-medium text-muted-foreground">
          {t.pricing.pageEyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl">
          {t.pricing.pageTitle}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">
          {t.pricing.subtitle}
        </p>
      </header>

      <div className="grid border border-border md:grid-cols-3">
        {t.pricing.plans.map((plan, index) => {
          const Icon = PLAN_ICONS[index] ?? Cloud;

          return (
          <div
            key={plan.title}
            className="relative flex min-h-[520px] flex-col border-b border-border bg-background p-6 last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0"
          >
            {"badge" in plan && plan.badge && (
              <div className="absolute top-5 right-5">
                <Badge className="rounded-full bg-foreground px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-background">
                  {plan.badge}
                </Badge>
              </div>
            )}
            <div className="space-y-5">
              <span className="flex size-11 items-center justify-center rounded-md border border-border">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-xl font-semibold">{plan.title}</h2>
                <p className="mt-4 text-3xl font-semibold tracking-tight">
                  {plan.price}
                </p>
                {"priceNote" in plan && plan.priceNote && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    {plan.priceNote}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-8 flex grow flex-col gap-6">
              <ul className="space-y-4 text-sm text-muted-foreground">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-2 h-px w-4 shrink-0 bg-foreground" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-auto h-11 rounded-md">
                <Link href={`/contact?plan=${encodeURIComponent(plan.title)}`}>
                  {plan.cta}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}
