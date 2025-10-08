import type { Metadata } from "next";

import { ContactPage } from "@/components/pages/contact-page";

export const metadata: Metadata = {
  title: "Contact · Insight Reviews",
};

export default function Page() {
  return <ContactPage />;
}
