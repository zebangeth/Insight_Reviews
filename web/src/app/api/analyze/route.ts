import { NextResponse, type NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { z } from "zod";

import { MODEL_REGISTRY, type ModelId } from "@/config/models";
import { buildPrompt } from "@/lib/prompt-builder";
import type { FocusValue, PositionValue } from "@/config/analysis";
import { REVIEW_NUM_CAP } from "@/lib/constants";

const requestSchema = z.object({
  language: z.union([z.literal("en"), z.literal("zh")]),
  productInfo: z.string().max(200).optional(),
  reviewText: z.string().min(10),
  reviewCount: z.number().int().positive().max(REVIEW_NUM_CAP),
  focus: z.enum([
    "none",
    "product_features",
    "product_quality",
    "design",
    "user_experience",
    "pricing",
    "customer_service",
    "packaging",
  ]) as z.ZodType<FocusValue>,
  position: z.enum([
    "none",
    "operations",
    "customer_service",
    "product_rd",
    "quality_control",
    "logistics",
  ]) as z.ZodType<PositionValue>,
  question: z.string().max(400).optional(),
  modelId: z.enum([
    "openai:gpt-4o-mini",
    "anthropic:claude-3-haiku-20240307",
    "anthropic:claude-3-sonnet-20240229",
  ]) as z.ZodType<ModelId>,
});

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const validation = requestSchema.safeParse(payload);

  if (!validation.success) {
    return NextResponse.json(
      { error: "invalid-payload", details: validation.error.format() },
      { status: 400 },
    );
  }

  const {
    language,
    productInfo = "",
    reviewText,
    reviewCount,
    focus,
    position,
    question,
    modelId,
  } = validation.data;

  const descriptor = MODEL_REGISTRY[modelId];
  if (!descriptor) {
    return NextResponse.json(
      { error: "unknown-model" },
      { status: 400, statusText: "Bad Request" },
    );
  }

  const reviewLines = reviewText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const appliedReviewCount = Math.min(
    reviewLines.length,
    reviewCount,
    descriptor.maxReviews,
  );

  const normalizedReviewText = reviewLines
    .slice(0, appliedReviewCount)
    .join("\n");

  const prompt = buildPrompt({
    language,
    productInfo,
    reviewCount: appliedReviewCount,
    reviewText: normalizedReviewText,
    focus,
    position,
    question,
  });

  try {
    const content = await generateCompletion(descriptor.id, prompt);

    return NextResponse.json({
      text: content.trim(),
      modelId,
      provider: descriptor.provider,
    });
  } catch (error) {
    console.error("Analysis error:", error);

    const message =
      language === "zh"
        ? "分析失败，请稍后再试或检查 API Key 是否配置正确。"
        : "Analysis failed. Please retry or verify that API keys are set.";

    return NextResponse.json(
      { error: "analysis-failed", message },
      { status: 500 },
    );
  }
}

async function generateCompletion(modelId: ModelId, prompt: ReturnType<typeof buildPrompt>) {
  const descriptor = MODEL_REGISTRY[modelId];

  if (descriptor.provider === "openai") {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("Missing OPENAI_API_KEY");
    }

    const openai = new OpenAI({ apiKey });
    const response = await openai.chat.completions.create({
      model: descriptor.apiName,
      temperature: 0,
      messages: [
        { role: "system", content: prompt.system },
        { role: "user", content: prompt.user },
      ],
    });

    return response.choices[0]?.message?.content?.trim() ?? "";
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("Missing ANTHROPIC_API_KEY");
  }

  const anthropic = new Anthropic({ apiKey });
  const completion = await anthropic.messages.create({
    model: descriptor.apiName,
    max_tokens: 2048,
    temperature: 0,
    system: prompt.system,
    messages: [{ role: "user", content: prompt.user }],
  });

  let output = "";
  for (const block of completion.content) {
    if (block.type === "text") {
      output += block.text;
    }
  }

  return output.trim();
}
