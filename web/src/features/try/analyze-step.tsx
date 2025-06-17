"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { TryWorkflow } from "@/features/try/use-try-workflow";

type AnalyzeStepProps = Pick<
  TryWorkflow,
  | "t"
  | "preparedReview"
  | "isAnalyzing"
  | "analysisResult"
  | "analysisHint"
  | "effectiveReviewCount"
  | "handleAnalyze"
>;

export function AnalyzeStep({
  t,
  preparedReview,
  isAnalyzing,
  analysisResult,
  analysisHint,
  effectiveReviewCount,
  handleAnalyze,
}: AnalyzeStepProps) {
  return (
    <Card className="rounded-lg border-border bg-background shadow-none">
      <CardHeader>
        <CardTitle>{t.try.analyze.title}</CardTitle>
        <CardDescription>{analysisHint}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={handleAnalyze}
            disabled={!preparedReview || isAnalyzing}
          >
            {isAnalyzing ? t.try.analyze.loading : t.try.analyze.button}
          </Button>
          <span className="text-xs text-muted-foreground">
            {t.try.reviewCountLabel(effectiveReviewCount)}
          </span>
        </div>
        <Separator />
        <div className="space-y-4">
          <h3 className="text-base font-semibold">{t.try.analyze.resultLabel}</h3>
          {analysisResult ? (
            <pre className="max-h-[520px] overflow-auto rounded-md border border-border bg-muted/25 p-4 text-sm leading-relaxed">
              {analysisResult}
            </pre>
          ) : (
            <p className="text-sm text-muted-foreground">
              {t.try.analyze.emptyState}
            </p>
          )}
          <p className="text-xs text-muted-foreground">{t.try.shareHint}</p>
        </div>
      </CardContent>
    </Card>
  );
}
