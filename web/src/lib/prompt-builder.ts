import {
  FOCUS_PROMPTS,
  POSITION_PROMPTS,
  type FocusValue,
  type PositionValue,
} from "@/config/analysis";
import type { SupportedLanguage } from "@/providers/language-provider";

type PromptPieces = {
  system: string;
  user: string;
  complete: string;
};

type PromptInput = {
  language: SupportedLanguage;
  productInfo: string;
  reviewCount: number;
  reviewText: string;
  focus: FocusValue;
  position: PositionValue;
  question?: string;
};

export function buildPrompt({
  language,
  productInfo,
  reviewCount,
  reviewText,
  focus,
  position,
  question,
}: PromptInput): PromptPieces {
  const trimmedProduct = productInfo.trim() || (language === "zh" ? "该" : "this");
  const base = language === "zh" ? buildChinesePrompt : buildEnglishPrompt;

  const { system, user } = base({
    productInfo: trimmedProduct,
    reviewCount,
    reviewText,
    focus,
    position,
    question,
  });

  return {
    system,
    user,
    complete: `${system}${user}`,
  };
}

type BuildPromptPayload = {
  productInfo: string;
  reviewCount: number;
  reviewText: string;
  focus: FocusValue;
  position: PositionValue;
  question?: string;
};

function buildChinesePrompt({
  productInfo,
  reviewCount,
  reviewText,
  focus,
  position,
  question,
}: BuildPromptPayload) {
  const commonIntro = `你是一名资深的电商评价分析师。
你的任务是根据用户提供的电商客户评价列表分析这款 ${productInfo} 产品在淘宝平台上的最近${reviewCount}条产品评价。
分析过程中的注意事项如下：`;

  const outputExpectations = `2. 你的分析结果应该包括：
  a. 主要发现，作为总结段落简洁明了地列出主要发现；
  b. 具体分析，对每个主要发现进行详细地深入探讨；
  c. 优化建议，在分析结束后，请基于你的发现给出一些改进建议。
仅在必要时，对主要发现给出具体的客户评价内容作为证据，并注明评价日期。
3. 请用 Markdown 语法输出你的分析结果。`;

  let system: string;

  if (question && question.trim().length > 0) {
    system = `${commonIntro}
并根据客户评价内容，回答以下问题：${question.trim()}`;
  } else if (focus !== "none") {
    const focusPrompt = FOCUS_PROMPTS.zh[focus];
    system = `${commonIntro}
1. 本次分析不需要面面俱到，而要重点聚焦在以下方面：
  a. 首先筛选出客户评价中与${focusPrompt}相关的内容；
  b. 然后对筛选出来的相关内容进行分析总结。
${outputExpectations}`;
  } else if (position !== "none") {
    const positionPrompt = POSITION_PROMPTS.zh[position];
    system = `${commonIntro}
1. 本次分析不应该面面俱到，请仅站在${positionPrompt}${outputExpectations}`;
  } else {
    system = `${commonIntro}
1. 请你从不同角度全面地对客户评价进行分类总结和分析，如产品的主要优点和缺点、功能、外观、使用体验、定价、包装、客服服务、产品质量以及其他客户反映的问题。
${outputExpectations}`;
  }

  const user = `\n评价列表：\n\`\`\`${reviewText}\`\`\``;
  return { system, user };
}

function buildEnglishPrompt({
  productInfo,
  reviewCount,
  reviewText,
  focus,
  position,
  question,
}: BuildPromptPayload) {
  const commonIntro = `You are a seasoned e-commerce review analyst.
Your task is to analyze the most recent ${reviewCount} product reviews for the ${productInfo} product on the Taobao platform.
Keep these guidelines in mind:`;

  const outputExpectations = `2. Your analysis must cover:
  a. Key findings summarised concisely in an opening paragraph;
  b. Detailed analysis exploring every key finding in depth;
  c. Actionable recommendations at the end, grounded in your findings.
Only quote specific customer reviews when necessary and include the review date.
3. Present your analysis using Markdown formatting.`;

  let system: string;

  if (question && question.trim().length > 0) {
    system = `${commonIntro}
Use the customer review content to answer this question: ${question.trim()}`;
  } else if (focus !== "none") {
    const focusPrompt = FOCUS_PROMPTS.en[focus];
    system = `${commonIntro}
1. Prioritise the following:
  a. Filter customer comments related to ${focusPrompt}
  b. Analyse and summarise only the filtered content in detail.
${outputExpectations}`;
  } else if (position !== "none") {
    const positionPrompt = POSITION_PROMPTS.en[position];
    system = `${commonIntro}
1. Do not cover every angle—focus solely from the viewpoint of ${positionPrompt}
${outputExpectations}`;
  } else {
    system = `${commonIntro}
1. Provide a comprehensive breakdown of customer feedback, covering strengths, weaknesses, product functions, design, user experience, pricing, packaging, customer service, quality, and any additional issues raised.
${outputExpectations}`;
  }

  const user = `\nList of reviews:\n\`\`\`${reviewText}\`\`\``;
  return { system, user };
}
