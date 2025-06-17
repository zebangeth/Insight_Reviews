import "server-only";

import type { FocusValue, PositionValue } from "@/config/analysis";
import type { SupportedLanguage } from "@/i18n/locale";

export const FOCUS_PROMPTS: Record<
  SupportedLanguage,
  Record<Exclude<FocusValue, "none">, string>
> = {
  en: {
    product_features:
      "product functional characteristics such as main capabilities, usefulness, and customer reactions to these features.",
    product_quality:
      "product quality topics including durability, consistency, and customer feedback on defects or reliability.",
    design:
      "product aesthetics like appearance, color, shape, size, and any customer feedback about visual design.",
    user_experience:
      "user experience themes such as ease of use, comfort, and issues customers encounter during daily usage.",
    pricing:
      "pricing sentiment, including whether the product feels fairly priced, delivers value, and how customers react to cost.",
    customer_service:
      "customer service and ordering journey feedback, such as response speed, professionalism, support quality, and checkout flow.",
    packaging:
      "packaging and logistics feedback, like package condition, presentation, shipping speed, and delivery experience.",
  },
  zh: {
    product_features:
      "产品的功能特性，如主要功能、功能的实用性以及客户对功能的反馈。",
    product_quality:
      "产品质量相关的问题，如耐用性、质量稳定性以及客户对产品质量的反馈。",
    design:
      "产品外观设计相关的内容，如外观、颜色、形状、尺寸以及客户对外观设计的反馈。",
    user_experience:
      "客户对产品使用体验的反馈，如使用便利性、舒适性以及客户在使用过程中遇到的问题。",
    pricing: "产品价格相关的内容，如价格是否合理、价值匹配度以及客户对价格的反馈。",
    customer_service:
      "客服服务与下单体验相关的内容，如客服响应速度、服务质量、专业性以及下单流程体验。",
    packaging:
      "包装与物流相关的内容，如包装是否完好、外观设计、物流速度以及客户对物流体验的反馈。",
  },
};

export const POSITION_PROMPTS: Record<
  SupportedLanguage,
  Record<Exclude<PositionValue, "none">, string>
> = {
  en: {
    operations:
      "Analyze from the perspective of an e-commerce operations manager, focusing on factors that influence sales and customer satisfaction such as product popularity, merchandising, ordering experience, pricing, and actionable feedback.",
    customer_service:
      "Analyze from the perspective of a customer service manager, concentrating on response speed, service quality, professionalism, ordering convenience, escalations, and any feedback tied to customer support.",
    product_rd:
      "Analyze from the perspective of a product R&D manager, focusing on functional strengths, design feedback, user experience insights, and opportunities for product improvements.",
    quality_control:
      "Analyze from the perspective of a production and quality control manager, emphasizing quality issues, defects, consistency, and reliability concerns raised by customers.",
    logistics:
      "Analyze from the perspective of a logistics and supply chain manager, highlighting shipping speed, packaging quality, delivery issues, and inventory or fulfillment friction.",
  },
  zh: {
    operations:
      "请站在电商运营经理的角度分析，关注影响销量和客户满意度的因素，如产品受欢迎程度、销售策略、下单体验、定价，以及客户的建议。",
    customer_service:
      "请站在客服经理的角度分析，关注客服响应速度、服务质量、专业性、下单流程便捷性以及与客服相关的客户反馈。",
    product_rd:
      "请站在产品研发经理的角度分析，关注客户对产品功能、设计、用户体验等方面的反馈，并给出改进建议。",
    quality_control:
      "请站在生产和质量控制经理的角度分析，重点关注产品质量问题、缺陷及客户对质量稳定性的反馈。",
    logistics:
      "请站在物流与供应链经理的角度分析，关注包装完好度、物流速度、配送体验以及与物流相关的客户反馈。",
  },
};
