"use client";

import { CONTACT_COPY } from "@/content/contact";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/providers/language-provider";

const DEFAULT_CONTACT_EMAIL = "contact@insightreviews.app";
const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? DEFAULT_CONTACT_EMAIL;

export function ContactPage() {
  const { language } = useLanguage();
  const copy = CONTACT_COPY[language];

  return (
    <div className="space-y-16">
      <div className="mx-auto flex max-w-3xl flex-col gap-10">
        <header className="space-y-5 text-center">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {copy.pageTitle}
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            {copy.subtitle}
          </p>
        </header>

        <Card className="rounded-3xl border border-border/60 bg-gradient-to-br from-background via-background/90 to-background/60 shadow-xl backdrop-blur">
          <CardHeader className="space-y-4 pb-0 text-center">
            <CardTitle className="text-2xl font-semibold leading-tight">
              {copy.form.title}
            </CardTitle>
            <CardDescription className="text-base leading-relaxed text-muted-foreground">
              {copy.form.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 pt-6">
            <form
            action={`https://formsubmit.co/${CONTACT_EMAIL}`}
            method="POST"
            className="flex flex-col gap-7"
          >
            <input type="hidden" name="_captcha" value="false" />
            <label className="space-y-2 text-sm font-medium text-foreground/90">
              <span>{copy.form.nameLabel}</span>
              <Input
                name="name"
                required
                className="h-12 rounded-2xl border-input bg-background/80 text-base"
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-foreground/90">
              <span>{copy.form.emailLabel}</span>
              <Input
                type="email"
                name="email"
                required
                className="h-12 rounded-2xl border-input bg-background/80 text-base"
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-foreground/90">
              <span>{copy.form.messageLabel}</span>
              <Textarea
                name="message"
                rows={6}
                required
                className="min-h-[180px] rounded-2xl border-input bg-background/80 text-base"
              />
            </label>
            <div className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:justify-end">
              <Button
                type="submit"
                size="lg"
                className="h-12 rounded-2xl px-8 text-base font-semibold shadow-sm"
              >
                {copy.form.submitLabel}
              </Button>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              {language === "zh"
                ? "我们会在 24 小时内回复。若有紧急事项请直接发送邮件："
                : "We usually reply within one business day. For urgent requests, email us directly:"}
              <span className="ml-1 font-medium text-primary">
                {CONTACT_EMAIL}
              </span>
            </p>
          </form>
        </CardContent>
        </Card>
      </div>
    </div>
  );
}
