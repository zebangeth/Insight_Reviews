"use client";

import Image from "next/image";

import { useTranslations } from "@/hooks/use-translations";

export function TestimonialsSection() {
  const t = useTranslations();
  const { testimonials, testimonialsSectionTitle } = t.home;

  return (
    <section className="border-y border-border py-10">
      <p className="text-center text-lg font-semibold tracking-tight text-foreground">
        {testimonialsSectionTitle}
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
  );
}
