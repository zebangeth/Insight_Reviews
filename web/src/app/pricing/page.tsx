import type { Metadata } from "next";

import { PricingPage } from "@/components/pages/pricing-page";

export const metadata: Metadata = {
  title: "Pricing · Insight Reviews",
};

export default function Page() {
  return <PricingPage />;
}
