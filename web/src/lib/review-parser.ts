import { read, SSF, utils } from "xlsx";

import {
  EMPTY_REVIEW,
  REQUIRED_COLUMNS,
  REVIEW_NUM_CAP,
} from "@/lib/constants";

type RawRow = Record<string, unknown>;

export type ReviewEntry = {
  index: number;
  sku: string;
  date: string;
  firstReview: string;
  additionalReview: string;
  combined: string;
};

export type ParseSuccess = {
  ok: true;
  totalRows: number;
  totalValidReviews: number;
  cappedReviews: number;
  reviewText: string;
  preview: ReviewEntry[];
};

export type ParseFailure = {
  ok: false;
  reason: "missing-columns" | "no-valid-rows" | "invalid-file";
  missingColumns?: string[];
};

export type ParseResult = ParseSuccess | ParseFailure;

export function parseReviewFile(buffer: ArrayBuffer): ParseResult {
  let workbook;

  try {
    workbook = read(buffer, { type: "array" });
  } catch {
    return { ok: false, reason: "invalid-file" };
  }

  const [firstSheetName] = workbook.SheetNames;
  if (!firstSheetName) {
    return { ok: false, reason: "invalid-file" };
  }

  const sheet = workbook.Sheets[firstSheetName];

  const rows = utils.sheet_to_json<RawRow>(sheet, {
    raw: true,
    defval: "",
  });

  const headerRow = utils.sheet_to_json<string[]>(sheet, {
    header: 1,
    blankrows: false,
  })[0] ?? [];

  const missingColumns = REQUIRED_COLUMNS.filter(
    (column) => !headerRow.includes(column),
  );

  if (missingColumns.length > 0) {
    return {
      ok: false,
      reason: "missing-columns",
      missingColumns,
    };
  }

  const cleaned = rows
    .map(normalizeRow)
    .filter((entry) =>
      hasMeaningfulContent(entry.firstReview, entry.additionalReview),
    )
    .map((entry, index) => ({ ...entry, index: index + 1 }));

  if (cleaned.length === 0) {
    return { ok: false, reason: "no-valid-rows" };
  }

  const cappedReviews = Math.min(REVIEW_NUM_CAP, cleaned.length);
  const reviewText = cleaned
    .slice(0, cappedReviews)
    .map(
      (entry, index) =>
        `${index + 1}. {${entry.date}} <${entry.combined}>`,
    )
    .join("\n");

  const preview = cleaned.slice(0, Math.min(5, cleaned.length));

  return {
    ok: true,
    totalRows: rows.length,
    totalValidReviews: cleaned.length,
    cappedReviews,
    reviewText,
    preview,
  };
}

function normalizeRow(row: RawRow): ReviewEntry {
  const sku = String(row["SKU"] ?? "").trim();
  const firstReview = sanitizeReview(row["首次评价"]);
  const additionalReview = sanitizeReview(row["追加评价"]);
  const date = formatExcelDate(row["首评时间"]);

  const combined =
    additionalReview.length > 0
      ? `${firstReview}...${additionalReview}`
      : firstReview;

  return {
    index: 0,
    sku,
    date,
    firstReview,
    additionalReview,
    combined,
  };
}

function sanitizeReview(value: unknown): string {
  if (!value) {
    return "";
  }

  const text = String(value).trim();
  if (text === EMPTY_REVIEW) {
    return "";
  }

  return text;
}

function formatExcelDate(value: unknown): string {
  if (!value) {
    return "N/A";
  }

  if (value instanceof Date) {
    return value.toISOString().split("T")[0]!;
  }

  if (typeof value === "number") {
    try {
      return SSF.format("yyyy-mm-dd", value);
    } catch {
      return value.toString();
    }
  }

  const text = String(value).trim();
  if (!text) {
    return "N/A";
  }

  return text;
}

function hasMeaningfulContent(first: string, additional: string) {
  const hasPrimary = first.length > 2;
  const hasAdditional =
    additional.length > 0 &&
    /[\w\u4e00-\u9fa5]/.test(additional.replaceAll(".", ""));

  return hasPrimary || hasAdditional;
}
