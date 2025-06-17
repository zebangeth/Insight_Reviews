import { NextResponse, type NextRequest } from "next/server";

import { getMessages } from "@/i18n";
import type { SupportedLanguage } from "@/i18n/locale";
import {
  ALLOWED_FILE_TYPES,
  MAX_UPLOAD_SIZE,
  OPENAI_CAP,
  REVIEW_NUM_CAP,
} from "@/lib/constants";
import { prepareLanguageSchema } from "@/server/analysis/schemas";
import { parseReviewFile } from "@/server/reviews/parse-reviews";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const validation = prepareLanguageSchema.safeParse({
    language: formData.get("language") ?? "en",
  });

  if (!validation.success) {
    return NextResponse.json(
      { error: "Invalid payload." },
      { status: 400, statusText: "Bad Request" },
    );
  }

  const language: SupportedLanguage = validation.data.language;
  const messages = getMessages(language);
  const file = formData.get("file");

  if (!(file instanceof Blob)) {
    return NextResponse.json(
      { error: messages.errors.fileRequired },
      { status: 400 },
    );
  }

  if (file.size === 0) {
    return NextResponse.json(
      { error: messages.errors.fileEmpty },
      { status: 400 },
    );
  }

  if (file.size > MAX_UPLOAD_SIZE) {
    return NextResponse.json(
      {
        error: messages.errors.fileTooLarge(
          Math.round(MAX_UPLOAD_SIZE / (1024 * 1024)),
        ),
      },
      { status: 400 },
    );
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: messages.errors.unsupportedFileType },
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
          message: messages.errors.missingColumns,
        },
        { status: 400 },
      );
    }

    const message =
      result.reason === "no-valid-rows"
        ? messages.errors.noValidRows
        : messages.errors.invalidFile;

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
