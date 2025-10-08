"use client";

import Link from "next/link";

import { PRICING_COPY } from "@/content/pricing";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/providers/language-provider";

export function PricingPage() {
  const { language } = useLanguage();
  const copy = PRICING_COPY[language];

  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{copy.pageTitle}</h1>
        <p className="max-w-3xl text-muted-foreground">{copy.subtitle}</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {copy.plans.map((plan) => (
          <Card
            key={plan.title}
            className="relative flex h-full flex-col border-border/70 bg-background/70 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="rounded-full bg-primary text-xs font-semibold uppercase tracking-wide text-primary-foreground shadow-sm">
                  {plan.badge}
                </Badge>
              </div>
            )}
            <CardHeader className="space-y-4">
              <div className="flex items-center gap-3 text-xl font-semibold">
                {plan.icon && (
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-2xl text-primary">
                    {plan.icon}
                  </span>
                )}
                <CardTitle>{plan.title}</CardTitle>
              </div>
              <CardDescription className="text-lg font-semibold text-primary/85">{plan.price}</CardDescription>
              {plan.priceNote && <p className="text-xs text-muted-foreground">{plan.priceNote}</p>}
            </CardHeader>
            <CardContent className="flex grow flex-col gap-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1 text-primary">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-auto w-full">
                <Link href={`/contact?plan=${encodeURIComponent(plan.title)}`}>{plan.cta}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
