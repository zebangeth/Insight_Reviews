import type { SupportedLanguage } from "@/providers/language-provider";

type ContactCopy = {
  pageTitle: string;
  subtitle: string;
  addressLabel: string;
  emailCta: string;
  form: {
    title: string;
    description: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    submitLabel: string;
    fallback: string;
  };
};

export const CONTACT_COPY: Record<SupportedLanguage, ContactCopy> = {
  en: {
    pageTitle: "Contact",
    subtitle:
      "Reach out for demos, deployment questions, or to discuss integrating Insight Reviews with your existing tooling.",
    addressLabel: "Email",
    emailCta: "Send email",
    form: {
      title: "Share your context",
      description:
        "Let us know how your team works with review data today. We usually reply within one business day.",
      nameLabel: "Your name",
      emailLabel: "Work email",
      messageLabel: "Message",
      submitLabel: "Send message",
      fallback:
        "Unable to load the contact form. Please email us directly using the link above.",
    },
  },
  zh: {
    pageTitle: "联系我们",
    subtitle:
      "想预约演示、了解部署方案，或讨论和现有系统的集成方式，可以直接联系。",
    addressLabel: "邮箱",
    emailCta: "发送邮件",
    form: {
      title: "告诉我们你的场景",
      description:
        "简单介绍你们目前如何处理评价数据，我们会给出更贴近业务的演示和建议。",
      nameLabel: "称呼",
      emailLabel: "工作邮箱",
      messageLabel: "需求说明",
      submitLabel: "发送",
      fallback:
        "联系表单加载失败，请直接通过上方邮箱联系我们。",
    },
  },
};
