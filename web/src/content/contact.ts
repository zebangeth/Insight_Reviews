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
      "欢迎预约演示、咨询部署方案或探讨与现有系统的集成方式，我们将在一个工作日内回复您。",
    addressLabel: "邮箱",
    emailCta: "发送邮件",
    form: {
      title: "留下您的需求",
      description:
        "简单介绍您目前的评价处理流程，我们将提供针对性的建议和演示。",
      nameLabel: "称呼",
      emailLabel: "联系邮箱",
      messageLabel: "留言内容",
      submitLabel: "提交",
      fallback:
        "联系表单加载失败，请直接通过上方邮箱与我们联系。",
    },
  },
};
