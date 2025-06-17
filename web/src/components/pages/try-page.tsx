"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { MODEL_OPTIONS, type ModelId } from "@/config/models";
import type { FocusValue, PositionValue } from "@/config/analysis";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "@/hooks/use-translations";
import { useLanguage } from "@/providers/language-provider";
import type { ReviewEntry } from "@/lib/review-parser";
import { toast } from "sonner";

type UploadStatus = "idle" | "uploading" | "ready" | "error";

type PreparedReview = {
  reviewText: string;
  totalValidReviews: number;
  cappedReviews: number;
  preview: ReviewEntry[];
  limits: {
    openAi: number;
    absolute: number;
  };
};

const MODEL_BY_ID = Object.fromEntries(MODEL_OPTIONS.map((option) => [option.id, option]));

export function TryPage() {
  const { language } = useLanguage();
  const t = useTranslations();
  const focusOptions = t.analysis.focusOptions;
  const positionOptions = t.analysis.positionOptions;

  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [statusMessage, setStatusMessage] = useState<string>(t.try.status.waitingForFile);
  const [preparedReview, setPreparedReview] = useState<PreparedReview | null>(null);

  const [productInfo, setProductInfo] = useState("");
  const [focus, setFocus] = useState<FocusValue>("none");
  const [position, setPosition] = useState<PositionValue>("none");
  const [question, setQuestion] = useState("");
  const [modelId, setModelId] = useState<ModelId>(MODEL_OPTIONS[0]?.id ?? "openai:gpt-4o-mini");
  const [analysisResult, setAnalysisResult] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (!preparedReview) {
      setStatusMessage(t.try.status.waitingForFile);
      return;
    }

    const message =
      preparedReview.cappedReviews < preparedReview.totalValidReviews
        ? t.try.status.truncated(preparedReview.totalValidReviews, preparedReview.cappedReviews)
        : t.try.status.ready(preparedReview.totalValidReviews);

    setStatusMessage(message);
  }, [t.try.status, preparedReview, language]);

  const selectedModel = useMemo(() => MODEL_BY_ID[modelId], [modelId]);

  const effectiveReviewCount = useMemo(() => {
    if (!preparedReview) {
      return 0;
    }
    return Math.min(preparedReview.cappedReviews, selectedModel?.maxReviews ?? preparedReview.cappedReviews);
  }, [preparedReview, selectedModel]);

  const analysisHint = useMemo(() => {
    if (!preparedReview) {
      return t.try.analyze.emptyState;
    }

    return preparedReview.cappedReviews < preparedReview.totalValidReviews
      ? t.try.status.truncated(preparedReview.totalValidReviews, preparedReview.cappedReviews)
      : t.try.status.ready(preparedReview.totalValidReviews);
  }, [preparedReview, t.try.status, t.try.analyze.emptyState]);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setUploadStatus("uploading");
    setStatusMessage(t.try.status.processing);
    setPreparedReview(null);
    setAnalysisResult("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("language", language);

    try {
      const response = await fetch("/api/reviews/prepare", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));

        if (errorBody?.error === "missing-columns" && Array.isArray(errorBody.missingColumns)) {
          setStatusMessage(t.try.status.missingColumns(errorBody.missingColumns));
        } else if (errorBody?.error === "no-valid-rows") {
          setStatusMessage(t.try.status.noValidRows);
        } else {
          setStatusMessage(t.try.status.invalidFile);
        }

        setUploadStatus("error");
        return;
      }

      const data = (await response.json()) as {
        reviewText: string;
        totalValidReviews: number;
        cappedReviews: number;
        preview: ReviewEntry[];
        limits: { openAi: number; absolute: number };
      };

      setPreparedReview({
        reviewText: data.reviewText,
        totalValidReviews: data.totalValidReviews,
        cappedReviews: data.cappedReviews,
        preview: data.preview,
        limits: data.limits,
      });

      setUploadStatus("ready");
    } catch (error) {
      console.error("Upload error", error);
      setUploadStatus("error");
      setStatusMessage(t.try.status.invalidFile);
    } finally {
      event.target.value = "";
    }
  }

  async function handleAnalyze() {
    if (!preparedReview || !selectedModel) {
      toast.error(t.try.status.waitingForFile);
      return;
    }

    const reviewLines = preparedReview.reviewText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .slice(0, effectiveReviewCount);

    if (reviewLines.length === 0) {
      toast.error(t.try.status.noValidRows);
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language,
          productInfo,
          reviewText: reviewLines.join("\n"),
          reviewCount: reviewLines.length,
          focus,
          position,
          question: question.trim().length > 0 ? question.trim() : undefined,
          modelId,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        toast.error(errorBody?.message ?? t.try.toast.analysisFailed);
        return;
      }

      const result = await response.json();
      setAnalysisResult(result.text);
      toast.success(t.try.toast.analysisCompleted);
    } catch (error) {
      console.error("Analysis error", error);
      toast.error(t.try.toast.analysisError);
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <div className="space-y-10">
      <header className="border-b border-border pb-10">
        <p className="text-sm font-medium text-muted-foreground">
          {t.try.pageEyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl">
          {t.try.pageTitle}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground">
          {t.try.subtitle}
        </p>
      </header>

      <div className="grid gap-8">
        <Card className="rounded-lg border-border bg-background shadow-none">
          <CardHeader>
            <CardTitle>{t.try.upload.title}</CardTitle>
            <CardDescription>{t.try.upload.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-3 rounded-md border border-dashed border-border bg-muted/25 p-6">
              <label className="flex flex-col gap-3 text-sm font-medium">
                <span>{t.try.uploadFileLabel}</span>
                <Input
                  type="file"
                  accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  onChange={handleFileChange}
                  disabled={uploadStatus === "uploading"}
                />
              </label>
              <p
                className="text-sm"
                data-state={uploadStatus}
              >
                {statusMessage}
              </p>
            </div>

            <div className="rounded-md border border-border bg-muted/25 p-5 text-sm leading-relaxed text-muted-foreground">
              <ol className="list-decimal space-y-2 pl-5">
                {t.try.upload.instructions.map((instruction) => (
                  <li key={instruction}>{instruction}</li>
                ))}
              </ol>
              <p className="mt-3 text-xs">
                {t.try.upload.helper}
              </p>
              <div className="relative mt-4 overflow-hidden rounded-md border border-border bg-background p-3">
                <Image
                  src="/images/Compatible_Browswer_Extensions.png"
                  alt={t.try.extensionImageAlt}
                  width={960}
                  height={600}
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold">
                  {t.try.previewLabel}
                </h3>
                {preparedReview && (
                  <span className="text-xs font-medium uppercase tracking-wide text-primary/80">
                    {t.try.reviewCountLabel(effectiveReviewCount)}
                  </span>
                )}
              </div>
              <div className="rounded-md border border-border bg-background p-4">
                {preparedReview ? (
                  <ul className="space-y-3 text-sm">
                    {preparedReview.preview.map((entry) => (
                      <li key={entry.index} className="space-y-1">
                        <p className="font-medium text-primary/80">
                          {entry.index}. {entry.date}
                        </p>
                        <p className="text-muted-foreground">
                          {entry.combined}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {t.try.previewEmpty}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border-border bg-background shadow-none">
          <CardHeader>
            <CardTitle>{t.try.configure.title}</CardTitle>
            <CardDescription>{t.try.configure.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium">
                <span>{t.try.configure.productLabel}</span>
                <Input
                  value={productInfo}
                  onChange={(event) => setProductInfo(event.target.value)}
                  placeholder={t.try.configure.productPlaceholder}
                />
              </label>
              <label className="space-y-2 text-sm font-medium">
                <span>{t.try.configure.modelLabel}</span>
                <Select
                  value={modelId}
                  onValueChange={(value) => setModelId(value as ModelId)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MODEL_OPTIONS.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.label[language]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {selectedModel?.helper[language] ?? t.try.configure.modelHelper}
                </p>
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium">
                <span>{t.try.configure.focusLabel}</span>
                <Select
                  value={focus}
                  onValueChange={(value) => setFocus(value as FocusValue)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {focusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
              <label className="space-y-2 text-sm font-medium">
                <span>{t.try.configure.positionLabel}</span>
                <Select
                  value={position}
                  onValueChange={(value) => setPosition(value as PositionValue)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {positionOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
            </div>

            <label className="space-y-2 text-sm font-medium">
              <span>{t.try.configure.questionLabel}</span>
              <Textarea
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder={t.try.configure.questionPlaceholder}
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                {t.try.configure.questionHelper}
              </p>
            </label>
          </CardContent>
        </Card>

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
      </div>

    </div>
  );
}
