"use client";

import { useState } from "react";

import { ComparisonSection } from "@/features/home/comparison-section";
import { type RoleKey } from "@/features/home/constants";
import { DemoDashboard } from "@/features/home/demo-dashboard";
import { ExportsSection } from "@/features/home/exports-section";
import { HeroSection } from "@/features/home/hero-section";
import { TestimonialsSection } from "@/features/home/testimonials-section";

export function HomePage() {
  const [activeRole, setActiveRole] = useState<RoleKey>("cx");

  return (
    <div className="space-y-16">
      <section className="grid gap-10 lg:grid-cols-[310px_1fr] lg:items-start">
        <HeroSection />
        <DemoDashboard activeRole={activeRole} onRoleChange={setActiveRole} />
        <ComparisonSection />
      </section>
      <TestimonialsSection />
      <ExportsSection />
    </div>
  );
}
