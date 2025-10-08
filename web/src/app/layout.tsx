import type { Metadata } from "next";

import { SITE_DESCRIPTION, SITE_NAME } from "@/config/site";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/providers/language-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="min-h-screen bg-background font-sans antialiased"
      >
        <LanguageProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">
              <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:py-16">
                {children}
              </div>
            </main>
            <SiteFooter />
          </div>
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
