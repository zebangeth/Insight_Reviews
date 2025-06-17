import "server-only";

import { z } from "zod";

import type { FocusValue, PositionValue } from "@/config/analysis";
import { MODEL_IDS, type ModelId } from "@/config/models";
import { REVIEW_NUM_CAP } from "@/lib/constants";

const focusValues = [
  "none",
  "product_features",
  "product_quality",
  "design",
  "user_experience",
  "pricing",
  "customer_service",
  "packaging",
] as const satisfies readonly FocusValue[];

const positionValues = [
  "none",
  "operations",
  "customer_service",
  "product_rd",
  "quality_control",
  "logistics",
] as const satisfies readonly PositionValue[];

export const prepareLanguageSchema = z.object({
  language: z.union([z.literal("en"), z.literal("zh")]).default("en"),
});

export const analyzeRequestSchema = z.object({
  language: z.union([z.literal("en"), z.literal("zh")]),
  productInfo: z.string().max(200).optional(),
  reviewText: z.string().min(10),
  reviewCount: z.number().int().positive().max(REVIEW_NUM_CAP),
  focus: z.enum(focusValues) as z.ZodType<FocusValue>,
  position: z.enum(positionValues) as z.ZodType<PositionValue>,
  question: z.string().max(400).optional(),
  modelId: z.enum(MODEL_IDS) as z.ZodType<ModelId>,
});

export type AnalyzeRequest = z.infer<typeof analyzeRequestSchema>;
