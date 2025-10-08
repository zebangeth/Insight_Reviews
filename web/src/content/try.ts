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
    pageTitle: "三步完成智能分析",
    subtitle:
      "沿用原有 Streamlit 流程，界面更轻便、提示词更完善，助力团队快速复现既有体验。",
    upload: {
      title: "第 1 步 · 上传评价 Excel",
      description:
        "目前支持淘宝/天猫等浏览器插件导出的标准字段（SKU、首次评价、首评时间、追加评价）。",
      instructions: [
        "通过浏览器插件导出最新的客户评价，格式为 .xlsx。",
        "请勿修改表头文字，解析器依赖原始字段名。",
        "文件仅在内存中处理，不会在服务器持久化存储。",
      ],
      helper: "需要示例文件？可使用仓库 tests 目录下的样例。",
    },
    configure: {
      title: "第 2 步 · 设置分析偏好",
      description:
        "选择关注重点即可生成与原应用一致的多角色分析。若填写问题，将优先生效。",
      productLabel: "产品名称或背景",
      productPlaceholder: "例如：护肤精华 50ml 套装",
      focusLabel: "重点关注",
      positionLabel: "团队视角",
      questionLabel: "自定义问题（可选）",
      questionPlaceholder: "例如：618 期间发货延迟的客户反馈有哪些？",
      questionHelper: "填写问题后，将覆盖上方的岗位与分析焦点设置。",
      modelLabel: "选择模型",
      modelHelper:
        "选择用于生成报告的模型。GPT-4o mini 建议分析 75 条内，Claude 系列可覆盖全部 300 条。",
    },
    analyze: {
      title: "第 3 步 · 生成 Insight Reviews 报告",
      button: "开始生成",
      loading: "正在生成分析...",
      resultLabel: "分析结果",
      emptyState: "请先上传有效的评价文件并完成设置，即可调用 AI 分析。",
    },
    status: {
      waitingForFile: "请先上传评价文件。",
      invalidFile: "文件解析失败，请确认格式为 .xlsx。",
      processing: "正在处理文件...",
      ready: (total) => `已准备就绪，共检测到 ${total} 条有效评价。`,
      truncated: (total, cap) =>
        `已准备就绪，共检测到 ${total} 条有效评价。将分析其中的 ${cap} 条。`,
      missingColumns: (columns) =>
        `文件缺少必须字段：${columns.join("、")}`,
      noValidRows: "所有评价内容为空，请尝试导出其他时间范围。",
    },
    previewLabel: "部分评价预览",
    previewEmpty: "上传合规文件后，可在此查看前几条评价。",
    reviewCountLabel: (count) => `已选评价 ${count} 条`,
    shareHint: "小提示：可将 Markdown 输出保存或分享至团队协作工具，便于后续跟进。",
  },
};
