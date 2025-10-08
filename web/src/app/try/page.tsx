import type { Metadata } from "next";

import { TryPage } from "@/components/pages/try-page";

export const metadata: Metadata = {
  title: "Try Insight Reviews",
};

export default function Page() {
  return <TryPage />;
}
