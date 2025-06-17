import "server-only";

import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";

import { MODEL_REGISTRY, type ModelId } from "@/config/models";
import { buildPrompt } from "@/server/analysis/prompt-builder";
import type { AnalyzeRequest } from "@/server/analysis/schemas";

type AnalysisResult = {
  text: string;
  modelId: ModelId;
  provider: "openai" | "anthropic";
};

export async function runAnalysis(input: AnalyzeRequest): Promise<AnalysisResult> {
  const descriptor = MODEL_REGISTRY[input.modelId];
  if (!descriptor) {
    throw new Error("unknown-model");
  }

  const reviewLines = input.reviewText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const appliedReviewCount = Math.min(
    reviewLines.length,
    input.reviewCount,
    descriptor.maxReviews,
  );

  const normalizedReviewText = reviewLines
    .slice(0, appliedReviewCount)
    .join("\n");

  const prompt = buildPrompt({
    language: input.language,
    productInfo: input.productInfo ?? "",
    reviewCount: appliedReviewCount,
    reviewText: normalizedReviewText,
    focus: input.focus,
    position: input.position,
    question: input.question,
  });

  const text = await generateCompletion(input.modelId, prompt);

  return {
    text: text.trim(),
    modelId: input.modelId,
    provider: descriptor.provider,
  };
}

async function generateCompletion(
  modelId: ModelId,
  prompt: ReturnType<typeof buildPrompt>,
) {
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
