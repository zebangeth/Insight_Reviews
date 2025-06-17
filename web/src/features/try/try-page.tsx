"use client";

import { AnalyzeStep } from "@/features/try/analyze-step";
import { ConfigureStep } from "@/features/try/configure-step";
import { UploadStep } from "@/features/try/upload-step";
import { useTryWorkflow } from "@/features/try/use-try-workflow";

export function TryPage() {
  const workflow = useTryWorkflow();

  return (
    <div className="space-y-10">
      <header className="border-b border-border pb-10">
        <p className="text-sm font-medium text-muted-foreground">
          {workflow.t.try.pageEyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl">
          {workflow.t.try.pageTitle}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">
          {workflow.t.try.subtitle}
        </p>
      </header>

      <div className="grid gap-8">
        <UploadStep {...workflow} />
        <ConfigureStep {...workflow} />
        <AnalyzeStep {...workflow} />
      </div>
    </div>
  );
}
