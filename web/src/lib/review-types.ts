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
