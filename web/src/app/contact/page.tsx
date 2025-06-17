import type { Metadata } from "next";

import { ContactPage } from "@/features/contact/contact-page";

export const metadata: Metadata = {
  title: "Contact · Insight Reviews",
};

export default function Page() {
  return <ContactPage />;
}
