import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import {
  ALLOWED_FILE_TYPES,
  MAX_UPLOAD_SIZE,
  OPENAI_CAP,
  REVIEW_NUM_CAP,
} from "@/lib/constants";
import { parseReviewFile } from "@/lib/review-parser";
import type { SupportedLanguage } from "@/providers/language-provider";

const payloadSchema = z.object({
  language: z.union([z.literal("en"), z.literal("zh")]).default("en"),
});

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const validation = payloadSchema.safeParse({
    language: formData.get("language") ?? "en",
  });

  if (!validation.success) {
    return NextResponse.json(
      { error: "Invalid payload." },
      { status: 400, statusText: "Bad Request" },
    );
  }

  const language: SupportedLanguage = validation.data.language;
  const file = formData.get("file");

  if (!(file instanceof Blob)) {
    return NextResponse.json(
      { error: "File upload is required." },
      { status: 400 },
    );
  }

  if (file.size === 0) {
    return NextResponse.json(
      { error: "Uploaded file is empty." },
      { status: 400 },
    );
  }

  if (file.size > MAX_UPLOAD_SIZE) {
    return NextResponse.json(
      {
        error: `File is too large. Maximum allowed size is ${Math.round(
          MAX_UPLOAD_SIZE / (1024 * 1024),
        )} MB.`,
      },
      { status: 400 },
    );
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return NextResponse.json(
      {
        error: "Unsupported file type. Please upload an .xlsx export file.",
      },
      { status: 400 },
    );
  }

  const buffer = await file.arrayBuffer();
  const result = parseReviewFile(buffer);

  if (!result.ok) {
    if (result.reason === "missing-columns") {
      return NextResponse.json(
        {
          error: "missing-columns",
          missingColumns: result.missingColumns,
          message:
            language === "zh"
              ? "文件缺少必需列。请确认使用兼容的浏览器插件导出的表格。"
              : "Required review columns are missing. Please ensure you uploaded the supported export format.",
        },
        { status: 400 },
      );
    }

    const message =
      result.reason === "no-valid-rows"
        ? language === "zh"
          ? "未找到有效的评价内容，请确认评价列不为空。"
          : "No valid reviews were found. Please make sure the review columns contain text."
        : language === "zh"
          ? "文件解析失败，请确认文件格式为 .xlsx。"
          : "We could not parse the file. Please check that it is a valid .xlsx export.";

    return NextResponse.json({ error: result.reason, message }, { status: 400 });
  }

  return NextResponse.json({
    language,
    totalRows: result.totalRows,
    totalValidReviews: result.totalValidReviews,
    cappedReviews: result.cappedReviews,
    reviewText: result.reviewText,
    preview: result.preview,
    limits: {
      openAi: OPENAI_CAP,
      absolute: REVIEW_NUM_CAP,
    },
  });
}
