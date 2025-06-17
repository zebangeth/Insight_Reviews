export const zh = {
  common: {
    siteName: "Insight Reviews",
    siteDescription:
      "LLM-powered insights that help e-commerce teams turn customer reviews into strategy.",
    copyright: "© 2024 Insight Reviews",
    headerCta: "免费体验",
    nav: [
      { href: "/", label: "主页" },
      { href: "/try", label: "体验" },
      { href: "/pricing", label: "定价" },
      { href: "/contact", label: "联系" },
    ],
    footer:
      "此站点为 Insight Reviews 商业版功能演示。如需正式接入或私有化部署，请联系我们。",
  },
  analysis: {
    focusOptions: [
      { value: "none", label: "暂不选择" },
      { value: "product_features", label: "⚙️ 产品功能" },
      { value: "product_quality", label: "💎 产品质量" },
      { value: "design", label: "🎨 产品外观" },
      { value: "user_experience", label: "🖐️ 使用体验" },
      { value: "pricing", label: "💰 价格合理性" },
      {
        value: "customer_service",
        label: "💳 客服与下单体验",
      },
      { value: "packaging", label: "📦 包装与物流" },
    ],
    positionOptions: [
      { value: "none", label: "暂不选择" },
      { value: "operations", label: "👨🏻‍💻 电商运营" },
      { value: "customer_service", label: "🤵🏻‍♂️ 电商客服" },
      { value: "product_rd", label: "👩🏻‍🔬 产品研发" },
      { value: "quality_control", label: "👩🏻‍🔧 生产/质量控制" },
      { value: "logistics", label: "✈️ 物流/供应链" },
    ],
  },
  home: {
    hero: {
      badge: "AI 评价分析工作台",
      title: "把评价导出，变成决策依据。",
      subtitle:
        "上传电商平台导出的评价表，自动生成面向运营、产品、客服和供应链的分析报告。",
      primaryCta: "开始分析评价",
      secondaryCta: "查看定价",
    },
    steps: [
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
    features: [
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
    testimonials: [
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
    testimonialsSectionTitle: "真实电商团队的反馈",
    demo: {
      uploadTitle: "上传评价文件",
      supportedFormats: "支持 .xlsx 导出文件",
      validated: "校验通过",
      reviewsUnit: "条评价",
      replaceFile: "重新上传",
      fileReady: "文件状态",
      validationsPassed: "字段已通过校验",
      totalReviews: "有效评价",
      dateRange: "日期范围",
      columnsDetected: "识别字段",
      language: "语言",
      languageValue: "中文 / 英文",
      configureTitle: "设置分析条件",
      aiModel: "AI 模型",
      recommended: "推荐使用",
      reportFor: "选择报告视角",
      primaryFocus: "分析重点",
      primaryFocusValue: "客户体验与售后支持",
      customQuestion: "自定义问题",
      customQuestionValue: "退款申请集中在哪些问题？应该先优化什么？",
      analyzeButton: "开始分析",
      reportSuffix: "报告",
      executiveSummary: "报告摘要",
      summaryText:
        "整体满意度较上一周期提升 6%。物流延迟和退款流程仍是影响体验的主要问题。",
      averageRating: "平均评分",
      positiveSentiment: "正向反馈",
      negativeSentiment: "负向反馈",
      responseRate: "响应率",
      topThemes: "影响最大的主题",
      vsPriorPeriod: "较上一周期",
      viewFullReport: "查看完整报告",
      roles: {
        cx: {
          label: "客服团队",
          helper: "客户体验与售后支持",
        },
        product: {
          label: "产品经理",
          helper: "产品与功能洞察",
        },
        supply: {
          label: "供应链团队",
          helper: "履约与物流",
        },
        marketing: {
          label: "市场团队",
          helper: "品牌与用户声音",
        },
      },
      themeRows: [
        { label: "发货与物流", value: 24, sentiment: "up" as const },
        { label: "产品质量", value: 19, sentiment: "up" as const },
        { label: "客服响应", value: 16, sentiment: "flat" as const },
        { label: "包装体验", value: 11, sentiment: "down" as const },
        { label: "性价比", value: 9, sentiment: "flat" as const },
      ],
    },
    comparison: {
      beforeTitle: "之前：人工表格整理",
      beforeDescription: "筛选、分类、找证据都靠人工。",
      afterTitle: "之后：按角色生成报告",
      afterDescription: "评价自动转成洞察、证据和行动建议。",
      ctaTitle: "几分钟内得到第一份报告",
      ctaDescription: "无需信用卡，先预览一份分析结果。",
      tryForFree: "开始体验",
      viewPricing: "查看定价",
      tableHeaders: {
        reviewId: "评价 ID",
        rating: "评分",
        title: "主题",
        reviewText: "评价内容",
      },
      tableRows: [
        {
          id: "1001",
          rating: "2",
          title: "发货延迟",
          review: "晚到 5 天",
        },
        {
          id: "1002",
          rating: "1",
          title: "商品破损",
          review: "包装被压坏",
        },
        {
          id: "1003",
          rating: "3",
          title: "尺码偏小",
          review: "实物尺码偏小",
        },
      ],
      painPoints: [
        "人工筛选耗时",
        "重点问题难发现",
        "缺少团队视角",
        "分享和行动都慢",
      ],
      keyInsight: "关键洞察",
      keyInsightText:
        "发货延迟是满意度下降的主要原因，对 CSAT 影响约 -14 分。",
      topAction: "优先动作",
      topActionText: "先提升预计送达时间准确性，并主动同步物流变化。",
      csatImpactTitle: "各主题对 CSAT 的影响",
      csatThemes: [
        { label: "发货延迟", value: -14, width: 100 },
        { label: "包装破损", value: -9, width: 72 },
        { label: "尺码不符", value: -6, width: 56 },
        { label: "退款阻力", value: -5, width: 45 },
        { label: "产品质量", value: -4, width: 36 },
      ],
    },
    exports: {
      title: "沿用现有导出流程",
      heading: "不需要重建数据管道。",
      description:
        "继续使用淘宝、天猫等平台导出的评价表。Insight Reviews 负责字段识别、清洗、聚类和报告生成。",
      reviewsUnit: "条评价",
      current: "当前",
      archive: "历史",
      files: [
        { file: "reviews_may_2024.xlsx", date: "May 14, 2024", count: "45,231" },
        { file: "reviews_apr_2024.xlsx", date: "Apr 14, 2024", count: "38,901" },
        { file: "reviews_mar_2024.xlsx", date: "Mar 14, 2024", count: "41,302" },
      ],
    },
  },
  try: {
    pageEyebrow: "产品体验",
    pageTitle: "三步生成评价分析",
    subtitle: "上传评价表、选择报告视角，再让 AI 生成可直接分享的业务分析。",
    uploadFileLabel: "上传文件（仅支持 .xlsx）",
    extensionImageAlt: "兼容的浏览器插件",
    upload: {
      title: "第 1 步 · 上传评价表",
      description: "目前支持淘宝、天猫等浏览器插件导出的标准 .xlsx 文件。",
      instructions: [
        "从店铺工具或浏览器插件导出最新客户评价，格式为 .xlsx。",
        "尽量保留原始表头，系统会按标准字段自动识别。",
        "文件仅用于本次分析，不会在服务器长期保存。",
      ],
      helper: "需要示例文件？可使用仓库 tests 目录下的样例。",
    },
    configure: {
      title: "第 2 步 · 设置分析条件",
      description: "选择报告视角、分析重点，或直接输入一个你想回答的问题。",
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
      ready: (total: number) => `已识别 ${total} 条有效评价，可以开始分析。`,
      truncated: (total: number, cap: number) =>
        `已识别 ${total} 条有效评价，本次将分析前 ${cap} 条。`,
      missingColumns: (columns: string[]) =>
        `文件缺少必须字段：${columns.join("、")}`,
      noValidRows: "没有识别到有效评价，请尝试导出其他时间范围。",
    },
    previewLabel: "评价预览",
    previewEmpty: "上传文件后，这里会显示前几条有效评价。",
    reviewCountLabel: (count: number) => `已选评价 ${count} 条`,
    shareHint: "提示：可将分析结果复制到团队文档或会议材料中，便于后续跟进。",
    toast: {
      analysisCompleted: "分析已完成",
      analysisError: "分析过程中出现错误",
      analysisFailed: "Analysis failed.",
    },
  },
  pricing: {
    pageEyebrow: "灵活部署",
    pageTitle: "定价",
    subtitle: "从云端工作区开始试用，也可以部署到企业自有环境中。",
    plans: [
      {
        badge: "推荐",
        title: "云端工作区",
        price: "¥159 / 月",
        features: [
          "托管版 Insight Reviews 界面与 API",
          "每月最多 1,000 次分析",
          "模型调用费用已包含，无需额外购买 Key",
          "自动获得最新提示词与功能更新",
          "每次分析结束后清空使用日志",
        ],
        cta: "预约演示",
      },
      {
        title: "本地私有化部署",
        price: "¥1,299 一次性",
        priceNote: "安装至企业自有环境",
        features: [
          "可品牌化的 Next.js 前端与完整代码",
          "使用企业自有 OpenAI / Anthropic Key",
          "包含 3 次部署支持与答疑",
          "永久授权，可选年度维护服务",
        ],
        cta: "申请部署评估",
      },
      {
        title: "企业定制方案",
        price: "联系我们",
        features: [
          "接入企业自有数据源和更多电商平台",
          "按业务部门定制提示词与报告流程",
          "对接 BI 看板、工单或客服系统",
          "专属客户成功经理",
        ],
        cta: "提交需求",
      },
    ],
  },
  contact: {
    pageTitle: "联系我们",
    subtitle:
      "想预约演示、了解部署方案，或讨论和现有系统的集成方式，可以直接联系。",
    addressLabel: "邮箱",
    form: {
      title: "告诉我们你的场景",
      description:
        "简单介绍你们目前如何处理评价数据，我们会给出更贴近业务的演示和建议。",
      nameLabel: "称呼",
      emailLabel: "工作邮箱",
      messageLabel: "需求说明",
      submitLabel: "发送",
    },
    replyNote: "我们会在 24 小时内回复。若有紧急事项请直接发送邮件：",
  },
  errors: {
    invalidPayload: "Invalid payload.",
    fileRequired: "File upload is required.",
    fileEmpty: "Uploaded file is empty.",
    fileTooLarge: (maxMb: number) =>
      `File is too large. Maximum allowed size is ${maxMb} MB.`,
    unsupportedFileType:
      "Unsupported file type. Please upload an .xlsx export file.",
    missingColumns:
      "文件缺少必需列。请确认使用兼容的浏览器插件导出的表格。",
    noValidRows: "未找到有效的评价内容，请确认评价列不为空。",
    invalidFile: "文件解析失败，请确认文件格式为 .xlsx。",
    analysisFailed: "分析失败，请稍后再试或检查 API Key 是否配置正确。",
  },
} as const;
