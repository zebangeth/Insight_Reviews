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
    subtitle: "在一分钟内生成覆盖各岗位视角的电商评价分析报告，让决策更快速、更精准。",
    primaryCta: "立即体验智能分析",
    secondaryCta: "查看定价方案",
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
      title: "人工整理时间缩短 80%",
      description: "直接上传电商平台导出的原始表格，即刻将繁杂数据转化为结构化洞见。",
    },
    {
      title: "角色视角的分析故事",
      description: "运营、产品、客服、供应链团队，分别获取聚焦自身重点的可执行总结。",
    },
    {
      title: "兼容主流跨境店铺数据",
      description: "原生支持淘宝、天猫等导出格式，无需额外清洗，且不会在服务器保留您的原始数据。",
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
      title: "上传文件",
      description: "拖拽导出的 .xlsx 评价表，系统自动校验必要字段并过滤无效评价。",
    },
    {
      title: "设定重点",
      description: "选择关注岗位、分析维度或输入自定义问题，让报告更贴合实际需求。",
    },
    {
      title: "分析洞见",
      description: "获得结构化总结，包含关键发现、证据引用与行动建议。",
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
      quote: "过去要一周手动整理的评价，现在每天都能看到结论，很多原本被忽视的信号都浮现出来了。",
      author: "火蝠电商 运营负责人",
      logo: "/images/huofu_logo.png",
    },
    {
      quote: "客服、物流、产品第一次站在同一份报告上沟通，大家都能快速对齐问题与行动。",
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
    title: "兼容主流电商数据来源",
    description:
      "无需修改表格即可上传淘宝、天猫等浏览器插件导出的评价。Insight Reviews 会自动识别标准字段并保留原有品牌信息。",
    imageAlt: "支持的电商平台",
  },
};
