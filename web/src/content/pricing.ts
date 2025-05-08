import type { SupportedLanguage } from "@/providers/language-provider";

type Plan = {
  badge?: string;
  icon?: string;
  title: string;
  price: string;
  priceNote?: string;
  features: string[];
  cta: string;
};

export type PricingCopy = {
  pageTitle: string;
  subtitle: string;
  plans: Plan[];
};

export const PRICING_COPY: Record<SupportedLanguage, PricingCopy> = {
  en: {
    pageTitle: "Pricing",
    subtitle: "Start with the hosted demo or commission a private deployment that keeps data inside your network.",
    plans: [
      {
        badge: "Most Popular",
        icon: "⛅️",
        title: "Cloud workspace",
        price: "¥159 / month",
        features: [
          "Fully hosted Insight Reviews UI and APIs",
          "Up to 1,000 analysis runs per month",
          "Model usage bundled—no extra API fees",
          "Automatic upgrades to new prompt packs",
          "Usage logs purged after every analysis",
        ],
        cta: "Book a demo",
      },
      {
        icon: "🔒",
        title: "Private deployment",
        price: "¥1,299 one-time",
        priceNote: "Install on your own infrastructure",
        features: [
          "Self-hosted Next.js app with your brand",
          "Bring-your-own OpenAI & Anthropic keys",
          "Three follow-up implementation sessions",
          "Perpetual license with optional support add-ons",
        ],
        cta: "Request scope review",
      },
      {
        icon: "💼",
        title: "Enterprise custom",
        price: "Contact us",
        features: [
          "Custom datasets and additional marketplaces",
          "Fine-tuned prompts per business unit",
          "Integration with internal BI or ticketing tools",
          "Dedicated success engineer",
        ],
        cta: "Describe requirements",
      },
    ],
  },
  zh: {
    pageTitle: "定价方案",
    subtitle: "可选择云端托管体验，也可在企业私有环境中部署专属版本。",
    plans: [
      {
        badge: "热门方案",
        icon: "⛅️",
        title: "云端工作区",
        price: "¥159 / 月",
        features: [
          "Insight Reviews 完整界面与 API 托管服务",
          "每月 1,000 次分析额度",
          "模型调用费用已包含，无需额外购买 Key",
          "自动升级至最新提示词与功能模块",
          "每次分析结束后立即清空使用日志",
        ],
        cta: "预约演示",
      },
      {
        icon: "🔒",
        title: "本地私有化部署",
        price: "¥1,299 一次性",
        priceNote: "安装至企业自有环境",
        features: [
          "基于 Next.js 的品牌化前端与完整代码",
          "自带或自管 OpenAI / Anthropic Key",
          "提供 3 次实施支持与答疑",
          "永久授权，可选年度运维服务",
        ],
        cta: "申请部署评估",
      },
      {
        icon: "💼",
        title: "企业定制方案",
        price: "联系我们",
        features: [
          "接入企业自有数据源与更多电商平台",
          "按业务部门深度定制提示词与流程",
          "可视化看板或工单系统集成",
          "专属客户成功经理",
        ],
        cta: "提交需求",
      },
    ],
  },
};
