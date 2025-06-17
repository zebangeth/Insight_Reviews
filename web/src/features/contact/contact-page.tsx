"use client";

import { ArrowRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "@/hooks/use-translations";

const DEFAULT_CONTACT_EMAIL = "contact@insightreviews.app";
const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? DEFAULT_CONTACT_EMAIL;

export function ContactPage() {
  const t = useTranslations();

  return (
    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
      <aside className="border-b border-border pb-8 lg:border-r lg:border-b-0 lg:pr-10">
        <p className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Mail className="size-4 text-foreground" aria-hidden="true" />
          {t.contact.addressLabel}
        </p>
        <h1 className="mt-5 max-w-xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-5xl">
          {t.contact.pageTitle}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
          {t.contact.subtitle}
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold"
        >
          {CONTACT_EMAIL}
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </aside>

      <section className="border border-border bg-background p-6 sm:p-8">
        <div className="border-b border-border pb-6">
          <h2 className="text-2xl font-semibold leading-tight">
            {t.contact.form.title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {t.contact.form.description}
          </p>
        </div>
        <form
          action={`https://formsubmit.co/${CONTACT_EMAIL}`}
          method="POST"
          className="mt-7 flex flex-col gap-6"
        >
          <input type="hidden" name="_captcha" value="false" />
          <label className="space-y-2 text-sm font-medium text-foreground/90">
            <span>{t.contact.form.nameLabel}</span>
            <Input
              name="name"
              required
              className="h-11 rounded-md border-input bg-background text-base"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-foreground/90">
            <span>{t.contact.form.emailLabel}</span>
            <Input
              type="email"
              name="email"
              required
              className="h-11 rounded-md border-input bg-background text-base"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-foreground/90">
            <span>{t.contact.form.messageLabel}</span>
            <Textarea
              name="message"
              rows={6}
              required
              className="min-h-[180px] rounded-md border-input bg-background text-base"
            />
          </label>
          <div className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:justify-end">
            <Button
              type="submit"
              size="lg"
              className="h-11 rounded-md px-7 text-sm font-semibold"
            >
              {t.contact.form.submitLabel}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
          <p className="border-t border-border pt-6 text-sm text-muted-foreground">
            {t.contact.replyNote}
            <span className="ml-1 font-medium text-foreground">
              {CONTACT_EMAIL}
            </span>
          </p>
        </form>
      </section>
    </div>
  );
}
