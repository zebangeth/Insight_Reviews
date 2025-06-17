export const en = {
  common: {
    siteName: "Insight Reviews",
    siteDescription:
      "LLM-powered insights that help e-commerce teams turn customer reviews into strategy.",
    copyright: "© 2024 Insight Reviews",
    headerCta: "Try for free",
    nav: [
      { href: "/", label: "Home" },
      { href: "/try", label: "Try" },
      { href: "/pricing", label: "Pricing" },
      { href: "/contact", label: "Contact" },
    ],
    footer:
      "This site is a functional demo of the commercial Insight Reviews platform. Contact us for production access.",
  },
  analysis: {
    focusOptions: [
      { value: "none", label: "None Selected" },
      { value: "product_features", label: "⚙️ Product Features" },
      { value: "product_quality", label: "💎 Product Quality" },
      { value: "design", label: "🎨 Design & Appearance" },
      { value: "user_experience", label: "🖐️ User Experience" },
      { value: "pricing", label: "💰 Pricing" },
      {
        value: "customer_service",
        label: "💳 Customer Service & Ordering",
      },
      { value: "packaging", label: "📦 Packaging & Logistics" },
    ],
    positionOptions: [
      { value: "none", label: "None Selected" },
      { value: "operations", label: "👨🏻‍💻 E-commerce Operations" },
      { value: "customer_service", label: "🤵🏻‍♂️ Customer Service" },
      { value: "product_rd", label: "👩🏻‍🔬 Product R&D" },
      { value: "quality_control", label: "👩🏻‍🔧 Production / QC" },
      { value: "logistics", label: "✈️ Logistics / Supply Chain" },
    ],
  },
  home: {
    hero: {
      badge: "AI review intelligence workspace",
      title: "From review exports to decisions.",
      subtitle:
        "Summarise marketplace feedback with AI-built reports for every ecommerce function in under a minute.",
      primaryCta: "Start analysing reviews",
      secondaryCta: "Explore pricing",
    },
    steps: [
      {
        title: "Upload",
        description:
          "Drag in your .xlsx review export. We validate required columns and strip empty feedback automatically.",
      },
      {
        title: "Focus",
        description:
          "Pick the stakeholder role, analysis focus, or ask a custom question to tailor the prompt.",
      },
      {
        title: "Analyze",
        description:
          "Receive a structured summary with key findings, supporting evidence, and recommended next steps.",
      },
    ],
    features: [
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
    testimonials: [
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
    testimonialsSectionTitle: "Trusted by ecommerce teams",
    demo: {
      uploadTitle: "Upload review export",
      supportedFormats: "Supported formats: .xlsx",
      validated: "Validated",
      reviewsUnit: "reviews",
      replaceFile: "Replace file",
      fileReady: "File ready",
      validationsPassed: "Validations passed",
      totalReviews: "Total reviews",
      dateRange: "Date range",
      columnsDetected: "Columns detected",
      language: "Language",
      languageValue: "zh / en",
      configureTitle: "Configure analysis",
      aiModel: "AI model",
      recommended: "Recommended",
      reportFor: "Who is this report for?",
      primaryFocus: "Primary focus",
      primaryFocusValue: "Customer experience & support",
      customQuestion: "Custom question",
      customQuestionValue:
        "What are the top drivers of refund requests and how can we reduce them?",
      analyzeButton: "Analyze reviews",
      reportSuffix: " Report",
      executiveSummary: "Executive summary",
      summaryText:
        "Overall sentiment improved 6% vs prior period. Shipping delays and refund process friction continue to impact satisfaction the most.",
      averageRating: "Average rating",
      positiveSentiment: "Positive sentiment",
      negativeSentiment: "Negative sentiment",
      responseRate: "Response rate",
      topThemes: "Top themes by impact",
      vsPriorPeriod: "vs prior period",
      viewFullReport: "View full report",
      roles: {
        cx: {
          label: "CX Leader",
          helper: "Customer experience & support",
        },
        product: {
          label: "Product Manager",
          helper: "Product & feature insights",
        },
        supply: {
          label: "Supply Chain Lead",
          helper: "Operations & logistics",
        },
        marketing: {
          label: "Marketing Leader",
          helper: "Brand & customer voice",
        },
      },
      themeRows: [
        { label: "Shipping & Delivery", value: 24, sentiment: "up" as const },
        { label: "Product Quality", value: 19, sentiment: "up" as const },
        { label: "Customer Service", value: 16, sentiment: "flat" as const },
        { label: "Packaging", value: 11, sentiment: "down" as const },
        { label: "Value for Money", value: 9, sentiment: "flat" as const },
      ],
    },
    comparison: {
      beforeTitle: "Before: Spreadsheet triage",
      beforeDescription: "Manual, inconsistent, time-consuming.",
      afterTitle: "After: Stakeholder-ready report",
      afterDescription: "AI turns reviews into clear insights and actions.",
      ctaTitle: "Start your analysis in minutes",
      ctaDescription: "No credit card required. Get a preview report instantly.",
      tryForFree: "Try for free",
      viewPricing: "View pricing",
      tableHeaders: {
        reviewId: "Review ID",
        rating: "Rating",
        title: "Title",
        reviewText: "Review Text",
      },
      tableRows: [
        {
          id: "1001",
          rating: "2",
          title: "Late delivery",
          review: "Arrived 5 days late",
        },
        {
          id: "1002",
          rating: "1",
          title: "Damaged item",
          review: "Box was crushed",
        },
        {
          id: "1003",
          rating: "3",
          title: "Too small",
          review: "Size runs small",
        },
      ],
      painPoints: [
        "Hours of manual filtering",
        "Hard to spot what matters",
        "No role-specific view",
        "Slow to share and act",
      ],
      keyInsight: "Key insight",
      keyInsightText:
        "Delivery delay is the top driver of dissatisfaction, impacting CSAT by -14 points.",
      topAction: "Top action",
      topActionText:
        "Improve delivery ETA accuracy and provide proactive updates.",
      csatImpactTitle: "Impact on CSAT by theme",
      csatThemes: [
        { label: "Delivery delay", value: -14, width: 100 },
        { label: "Packaging damage", value: -9, width: 72 },
        { label: "Size mismatch", value: -6, width: 56 },
        { label: "Refund friction", value: -5, width: 45 },
        { label: "Product quality", value: -4, width: 36 },
      ],
    },
    exports: {
      title: "Works with your existing exports",
      heading: "No new data pipeline required.",
      description:
        "Keep using Taobao, Tmall, and browser-extension exports. Insight Reviews handles validation, clustering, and stakeholder-ready summaries.",
      reviewsUnit: "reviews",
      current: "Current",
      archive: "Archive",
      files: [
        { file: "reviews_may_2024.xlsx", date: "May 14, 2024", count: "45,231" },
        { file: "reviews_apr_2024.xlsx", date: "Apr 14, 2024", count: "38,901" },
        { file: "reviews_mar_2024.xlsx", date: "Mar 14, 2024", count: "41,302" },
      ],
    },
  },
  try: {
    pageEyebrow: "Product trial",
    pageTitle: "Guided analysis",
    subtitle:
      "Follow the three-step workflow used by the Streamlit app—now with a faster UI and richer prompts.",
    uploadFileLabel: "Upload file (.xlsx only)",
    extensionImageAlt: "Compatible browser extensions",
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
      ready: (total: number) => `Ready — ${total} valid reviews found.`,
      truncated: (total: number, cap: number) =>
        `Ready — ${total} valid reviews found. The first ${cap} reviews will be analysed.`,
      missingColumns: (columns: string[]) =>
        `The file is missing required columns: ${columns.join(", ")}`,
      noValidRows:
        "All reviews are empty placeholders. Try exporting a different time range.",
    },
    previewLabel: "Sampled reviews",
    previewEmpty:
      "Once a compatible file is uploaded you will see the first few reviews here.",
    reviewCountLabel: (count: number) => `${count} reviews selected`,
    shareHint:
      "Tip: download the Markdown output or paste it into your team’s workspace for quick follow-up actions.",
    toast: {
      analysisCompleted: "Analysis completed",
      analysisError: "An error occurred during analysis",
      analysisFailed: "Analysis failed.",
    },
  },
  pricing: {
    pageEyebrow: "Flexible deployment",
    pageTitle: "Pricing",
    subtitle:
      "Start with the hosted demo or commission a private deployment that keeps data inside your network.",
    plans: [
      {
        badge: "Most Popular",
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
  contact: {
    pageTitle: "Contact",
    subtitle:
      "Reach out for demos, deployment questions, or to discuss integrating Insight Reviews with your existing tooling.",
    addressLabel: "Email",
    form: {
      title: "Share your context",
      description:
        "Let us know how your team works with review data today. We usually reply within one business day.",
      nameLabel: "Your name",
      emailLabel: "Work email",
      messageLabel: "Message",
      submitLabel: "Send message",
    },
    replyNote:
      "We usually reply within one business day. For urgent requests, email us directly:",
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
      "Required review columns are missing. Please ensure you uploaded the supported export format.",
    noValidRows:
      "No valid reviews were found. Please make sure the review columns contain text.",
    invalidFile: "We could not parse the file. Please check that it is a valid .xlsx export.",
    analysisFailed:
      "Analysis failed. Please retry or verify that API keys are set.",
  },
} as const;
