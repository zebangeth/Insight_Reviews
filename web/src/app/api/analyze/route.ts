import { NextResponse, type NextRequest } from "next/server";

import { getMessages } from "@/i18n";
import { analyzeRequestSchema } from "@/server/analysis/schemas";
import { runAnalysis } from "@/server/analysis/run-analysis";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const validation = analyzeRequestSchema.safeParse(payload);

  if (!validation.success) {
    return NextResponse.json(
      { error: "invalid-payload", details: validation.error.format() },
      { status: 400 },
    );
  }

  const { language } = validation.data;
  const messages = getMessages(language);

  try {
    const result = await runAnalysis(validation.data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Analysis error:", error);

    return NextResponse.json(
      { error: "analysis-failed", message: messages.errors.analysisFailed },
      { status: 500 },
    );
  }
}
