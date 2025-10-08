"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { NAV_LINKS, SITE_NAME, SITE_TAGLINE } from "@/config/site";
import { LanguageToggle } from "@/components/language-toggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/language-provider";

const SHELL_CLASS =
  "mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-6";

export function SiteHeader() {
  const { language } = useLanguage();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className={SHELL_CLASS}>
        <Link href="/" className="flex flex-col">
          <span className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            {SITE_NAME}
          </span>
          <span className="text-sm text-muted-foreground">
            {SITE_TAGLINE[language]}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS[language].map((item) => {
            const active =
              item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  active && "bg-primary/10 text-primary",
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
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const links = NAV_LINKS[language];

  return (
    <Select
      value={getActiveHref(pathname, links)}
      onValueChange={(value) => router.push(value)}
    >
      <SelectTrigger className="w-[140px]">
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
