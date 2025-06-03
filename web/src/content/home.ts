import type { SupportedLanguage } from "@/providers/language-provider";

type Feature = {
  title: string;
  description: string;
};

type Step = {
  title: string;
  description: string;
};

type Testimonial = {
  quote: string;
  author: string;
  logo?: string;
};

type PlatformSection = {
  title: string;
  description: string;
  imageAlt: string;
};

export const HOME_HERO: Record<
  SupportedLanguage,
  {
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  }
> = {
  en: {
    title: "Insight Reviews",
    subtitle: "Summarise marketplace feedback with AI-built reports for every ecommerce function in under a minute.",
    primaryCta: "Start analysing reviews",
    secondaryCta: "Explore pricing",
  },
  zh: {
    title: "Insight Reviews",
    subtitle: "上传电商平台导出的评价表，自动生成面向运营、产品、客服和供应链的分析报告。",
    primaryCta: "开始分析评价",
    secondaryCta: "查看定价",
  },
};

export const HOME_FEATURES: Record<SupportedLanguage, Feature[]> = {
  en: [
    {
      title: "Reduce manual triage time by 80%",
      description:
        "Bulk import the marketplace exports you already use and turn messy rows into structured narratives instantly.",
    },
    {
      title: "Role-aware storytelling",
      description:
        "Ops, product, CX, and supply chain teams each receive tailored summaries focused on what they need to act.",
    },
    {
      title: "Works with cross-border storefronts",
      description:
        "Built for Taobao and Tmall exports—no custom data prep, no engineering dependency, and no raw data stored on our servers.",
    },
  ],
  zh: [
    {
      title: "人工整理少 80%",
      description: "直接上传平台导出的原始表格，把零散评价转成可阅读、可追踪的洞察。",
    },
    {
      title: "按团队视角生成报告",
      description: "运营、产品、客服、供应链各自看到最相关的问题、证据和行动建议。",
    },
    {
      title: "兼容现有导出流程",
      description: "支持淘宝、天猫等常见评价导出格式，无需额外清洗，也不保留原始文件。",
    },
  ],
};

export const HOME_STEPS: Record<SupportedLanguage, Step[]> = {
  en: [
    {
      title: "Upload",
      description:
        "Drag in your .xlsx review export. We validate required columns and strip empty feedback automatically.",
    },
    {
      title: "Focus",
      description: "Pick the stakeholder role, analysis focus, or ask a custom question to tailor the prompt.",
    },
    {
      title: "Analyze",
      description: "Receive a structured summary with key findings, supporting evidence, and recommended next steps.",
    },
  ],
  zh: [
    {
      title: "上传",
      description: "拖入 .xlsx 评价表，系统自动校验字段并过滤空评价。",
    },
    {
      title: "选择重点",
      description: "选择报告视角、分析重点，或输入一个具体业务问题。",
    },
    {
      title: "生成报告",
      description: "得到包含关键发现、证据引用和下一步建议的结构化报告。",
    },
  ],
};

export const HOME_TESTIMONIALS: Record<SupportedLanguage, Testimonial[]> = {
  en: [
    {
      quote:
        "We moved from weekly spreadsheet reviews to daily feature decisions—Insight Reviews surfaces signal we used to miss.",
      author: "KA Operations Director, Hotfor E-commerce",
      logo: "/images/huofu_logo.png",
    },
    {
      quote:
        "Our CX team finally sees the same story as logistics and product. It feels like everyone is reading the same brief.",
      author: "VP of Sales, Tea Tree",
      logo: "/images/teatree_logo.png",
    },
  ],
  zh: [
    {
      quote: "过去要一周手动整理的评价，现在每天都能看到结论，很多原本容易漏掉的信号都浮现出来了。",
      author: "火蝠电商 运营负责人",
      logo: "/images/huofu_logo.png",
    },
    {
      quote: "客服、物流、产品终于能围绕同一份报告沟通，问题、证据和行动都更容易对齐。",
      author: "一棵茶树 销售副总裁",
      logo: "/images/teatree_logo.png",
    },
  ],
};

export const HOME_PLATFORM_SECTION: Record<SupportedLanguage, PlatformSection> = {
  en: {
    title: "Compatible with all major e-commerce solutions",
    description:
      "Upload exports from Taobao, Tmall, and other browser extensions without manual formatting. Insight Reviews recognises the standard columns and keeps brand assets intact.",
    imageAlt: "Supported e-commerce platforms",
  },
  zh: {
    title: "兼容现有电商数据来源",
    description:
      "无需修改表格即可上传淘宝、天猫等浏览器插件导出的评价。Insight Reviews 会自动识别标准字段并生成分析报告。",
    imageAlt: "支持的电商平台",
  },
};
