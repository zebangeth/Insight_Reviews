"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { MODEL_OPTIONS, type ModelId } from "@/config/models";
import type { FocusValue, PositionValue } from "@/config/analysis";
import { useTranslations } from "@/hooks/use-translations";
import type { ReviewEntry } from "@/lib/review-types";
import { useLanguage } from "@/providers/language-provider";

export type UploadStatus = "idle" | "uploading" | "ready" | "error";

export type PreparedReview = {
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

export function useTryWorkflow() {
  const { language } = useLanguage();
  const t = useTranslations();

  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [statusMessage, setStatusMessage] = useState<string>(t.try.status.waitingForFile);
  const [preparedReview, setPreparedReview] = useState<PreparedReview | null>(null);
  const [productInfo, setProductInfo] = useState("");
  const [focus, setFocus] = useState<FocusValue>("none");
  const [position, setPosition] = useState<PositionValue>("none");
  const [question, setQuestion] = useState("");
  const [modelId, setModelId] = useState<ModelId>(
    MODEL_OPTIONS[0]?.id ?? "openai:gpt-4o-mini",
  );
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
    return Math.min(
      preparedReview.cappedReviews,
      selectedModel?.maxReviews ?? preparedReview.cappedReviews,
    );
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

  return {
    t,
    language,
    uploadStatus,
    statusMessage,
    preparedReview,
    productInfo,
    setProductInfo,
    focus,
    setFocus,
    position,
    setPosition,
    question,
    setQuestion,
    modelId,
    setModelId,
    analysisResult,
    isAnalyzing,
    selectedModel,
    effectiveReviewCount,
    analysisHint,
    focusOptions: t.analysis.focusOptions,
    positionOptions: t.analysis.positionOptions,
    handleFileChange,
    handleAnalyze,
  };
}

export type TryWorkflow = ReturnType<typeof useTryWorkflow>;
