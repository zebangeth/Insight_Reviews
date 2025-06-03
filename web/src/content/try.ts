import type { SupportedLanguage } from "@/providers/language-provider";

type StatusMessages = {
  waitingForFile: string;
  invalidFile: string;
  processing: string;
  ready: (total: number) => string;
  truncated: (total: number, cap: number) => string;
  missingColumns: (columns: string[]) => string;
  noValidRows: string;
};

type UploadStep = {
  title: string;
  description: string;
  instructions: string[];
  helper: string;
};

type ConfigureStep = {
  title: string;
  description: string;
  productLabel: string;
  productPlaceholder: string;
  focusLabel: string;
  positionLabel: string;
  questionLabel: string;
  questionPlaceholder: string;
  questionHelper: string;
  modelLabel: string;
  modelHelper: string;
};

type AnalyzeCopy = {
  title: string;
  button: string;
  loading: string;
  resultLabel: string;
  emptyState: string;
};

export type TryCopy = {
  pageTitle: string;
  subtitle: string;
  upload: UploadStep;
  configure: ConfigureStep;
  analyze: AnalyzeCopy;
  status: StatusMessages;
  previewLabel: string;
  previewEmpty: string;
  reviewCountLabel: (count: number) => string;
  shareHint: string;
};

export const TRY_COPY: Record<SupportedLanguage, TryCopy> = {
  en: {
    pageTitle: "Guided analysis",
    subtitle:
      "Follow the three-step workflow used by the Streamlit app—now with a faster UI and richer prompts.",
    upload: {
      title: "Step 1 · Upload your .xlsx export",
      description:
        "We currently support Taobao/Tmall browser extension exports with the standard columns (SKU, 首次评价, 首评时间, 追加评价).",
      instructions: [
        "Open your marketplace extension and export the latest customer reviews as an .xlsx file.",
        "Do not modify the column headers—the parser relies on the original text.",
        "Files are processed in-memory and never persisted on our servers.",
      ],
      helper: "Need a sample file? Use the fixtures in /tests.",
    },
    configure: {
      title: "Step 2 · Configure the analysis",
      description:
        "Tell the assistant what matters most. Role and focus filters mirror the legacy Streamlit behaviour.",
      productLabel: "Product name or context",
      productPlaceholder: "e.g. 护肤精华 50ml 套装",
      focusLabel: "Focus area",
      positionLabel: "Team perspective",
      questionLabel: "Custom question (optional)",
      questionPlaceholder:
        "What can we learn about delivery delays during the 6.18 promotion?",
      questionHelper:
        "When a question is provided it overrides the focus and team selectors.",
      modelLabel: "Model",
      modelHelper:
        "Pick an LLM for the summary. GPT-4o mini handles up to 75 reviews; Claude models support the full 300.",
    },
    analyze: {
      title: "Step 3 · Run Insight Reviews",
      button: "Generate analysis",
      loading: "Gathering insights...",
      resultLabel: "Analysis result",
      emptyState:
        "Upload a valid export and configure the options above to enable AI analysis.",
    },
    status: {
      waitingForFile: "Upload a review export to begin.",
      invalidFile: "We could not read this file—please ensure it is .xlsx format.",
      processing: "Processing file...",
      ready: (total) => `Ready — ${total} valid reviews found.`,
      truncated: (total, cap) =>
        `Ready — ${total} valid reviews found. The first ${cap} reviews will be analysed.`,
      missingColumns: (columns) =>
        `The file is missing required columns: ${columns.join(", ")}`,
      noValidRows:
        "All reviews are empty placeholders. Try exporting a different time range.",
    },
    previewLabel: "Sampled reviews",
    previewEmpty:
      "Once a compatible file is uploaded you will see the first few reviews here.",
    reviewCountLabel: (count) => `${count} reviews selected`,
    shareHint:
      "Tip: download the Markdown output or paste it into your team’s workspace for quick follow-up actions.",
  },
  zh: {
    pageTitle: "三步生成评价分析",
    subtitle:
      "上传评价表、选择报告视角，再让 AI 生成可直接分享的业务分析。",
    upload: {
      title: "第 1 步 · 上传评价表",
      description:
        "目前支持淘宝、天猫等浏览器插件导出的标准 .xlsx 文件。",
      instructions: [
        "从店铺工具或浏览器插件导出最新客户评价，格式为 .xlsx。",
        "尽量保留原始表头，系统会按标准字段自动识别。",
        "文件仅用于本次分析，不会在服务器长期保存。",
      ],
      helper: "需要示例文件？可使用仓库 tests 目录下的样例。",
    },
    configure: {
      title: "第 2 步 · 设置分析条件",
      description:
        "选择报告视角、分析重点，或直接输入一个你想回答的问题。",
      productLabel: "产品名称或业务背景",
      productPlaceholder: "例如：护肤精华 50ml 套装",
      focusLabel: "分析重点",
      positionLabel: "报告视角",
      questionLabel: "自定义问题（可选）",
      questionPlaceholder: "例如：618 期间发货延迟集中在哪些问题？",
      questionHelper: "填写问题后，系统会优先围绕该问题生成报告。",
      modelLabel: "选择模型",
      modelHelper:
        "选择用于生成报告的模型。GPT-4o mini 适合快速试用，Claude 系列适合更长文本。",
    },
    analyze: {
      title: "第 3 步 · 生成分析报告",
      button: "生成报告",
      loading: "正在分析评价...",
      resultLabel: "分析结果",
      emptyState: "请先上传有效评价文件并完成设置，即可开始分析。",
    },
    status: {
      waitingForFile: "上传评价文件后开始分析。",
      invalidFile: "文件解析失败，请确认格式为 .xlsx。",
      processing: "正在处理文件...",
      ready: (total) => `已识别 ${total} 条有效评价，可以开始分析。`,
      truncated: (total, cap) =>
        `已识别 ${total} 条有效评价，本次将分析前 ${cap} 条。`,
      missingColumns: (columns) =>
        `文件缺少必须字段：${columns.join("、")}`,
      noValidRows: "没有识别到有效评价，请尝试导出其他时间范围。",
    },
    previewLabel: "评价预览",
    previewEmpty: "上传文件后，这里会显示前几条有效评价。",
    reviewCountLabel: (count) => `已选评价 ${count} 条`,
    shareHint: "提示：可将分析结果复制到团队文档或会议材料中，便于后续跟进。",
  },
};
