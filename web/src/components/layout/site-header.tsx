"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, BarChart3 } from "lucide-react";

import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "@/hooks/use-translations";
import { cn } from "@/lib/utils";

const SHELL_CLASS =
  "mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-5 sm:px-6";

export function SiteHeader() {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className={SHELL_CLASS}>
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-md bg-foreground text-background">
            <BarChart3 className="size-4" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
            {t.common.siteName}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {t.common.nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  active &&
                    "text-foreground after:absolute after:inset-x-4 after:-bottom-[17px] after:h-px after:bg-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2 md:flex-initial">
          <div className="flex md:hidden">
            <MobileNav />
          </div>
          <LanguageToggle />
          <Button asChild className="hidden h-9 rounded-md px-4 text-xs font-semibold sm:inline-flex">
            <Link href="/try">
              {t.common.headerCta}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const links = t.common.nav;

  return (
    <Select
      value={getActiveHref(pathname, links)}
      onValueChange={(value) => router.push(value)}
    >
      <SelectTrigger className="h-9 w-[116px] rounded-md border-border bg-background text-xs font-medium">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {links.map((item) => (
          <SelectItem key={item.href} value={item.href}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function getActiveHref(
  pathname: string,
  links: ReadonlyArray<{ href: string }>,
) {
  if (pathname === "/") {
    return "/";
  }

  return links.find((link) => pathname.startsWith(link.href))?.href ?? "/";
}
