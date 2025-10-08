import type { SupportedLanguage } from "@/providers/language-provider";

export type Provider = "openai" | "anthropic";

export type ModelId =
  | "openai:gpt-4o-mini"
  | "anthropic:claude-3-haiku-20240307"
  | "anthropic:claude-3-sonnet-20240229";

type ModelDescriptor = {
  id: ModelId;
  provider: Provider;
  apiName: string;
  maxReviews: number;
  default?: boolean;
  description: Record<SupportedLanguage, string>;
};

export const MODEL_REGISTRY: Record<ModelId, ModelDescriptor> = {
  "openai:gpt-4o-mini": {
    id: "openai:gpt-4o-mini",
    provider: "openai",
    apiName: "gpt-4o-mini",
    maxReviews: 75,
    default: true,
    description: {
      en: "Best for short-turnaround summaries (≤75 reviews).",
      zh: "适合快速分析不超过 75 条评价的场景。",
    },
  },
  "anthropic:claude-3-haiku-20240307": {
    id: "anthropic:claude-3-haiku-20240307",
    provider: "anthropic",
    apiName: "claude-3-haiku-20240307",
    maxReviews: 300,
    description: {
      en: "Balanced detail and speed for up to 300 reviews.",
      zh: "在 300 条评价内提供均衡的速度与分析深度。",
    },
  },
  "anthropic:claude-3-sonnet-20240229": {
    id: "anthropic:claude-3-sonnet-20240229",
    provider: "anthropic",
    apiName: "claude-3-sonnet-20240229",
    maxReviews: 300,
    description: {
      en: "Highest quality insights for larger batches.",
      zh: "适合需要更高分析质量的大批量评价。",
    },
  },
};

export const MODEL_OPTIONS: ReadonlyArray<{
  id: ModelId;
  label: Record<SupportedLanguage, string>;
  helper: Record<SupportedLanguage, string>;
  provider: Provider;
  maxReviews: number;
}> = [
  {
    id: "openai:gpt-4o-mini",
    provider: "openai",
    maxReviews: MODEL_REGISTRY["openai:gpt-4o-mini"].maxReviews,
    label: {
      en: "OpenAI GPT-4o mini",
      zh: "OpenAI GPT-4o mini",
    },
    helper: MODEL_REGISTRY["openai:gpt-4o-mini"].description,
  },
  {
    id: "anthropic:claude-3-haiku-20240307",
    provider: "anthropic",
    maxReviews: MODEL_REGISTRY["anthropic:claude-3-haiku-20240307"].maxReviews,
    label: {
      en: "Anthropic Claude 3 Haiku",
      zh: "Anthropic Claude 3 Haiku",
    },
    helper: MODEL_REGISTRY["anthropic:claude-3-haiku-20240307"].description,
  },
  {
    id: "anthropic:claude-3-sonnet-20240229",
    provider: "anthropic",
    maxReviews: MODEL_REGISTRY["anthropic:claude-3-sonnet-20240229"].maxReviews,
    label: {
      en: "Anthropic Claude 3 Sonnet",
      zh: "Anthropic Claude 3 Sonnet",
    },
    helper: MODEL_REGISTRY["anthropic:claude-3-sonnet-20240229"].description,
  },
];
