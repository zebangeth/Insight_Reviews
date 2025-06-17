"use client";

import Image from "next/image";

import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TryWorkflow } from "@/features/try/use-try-workflow";

type UploadStepProps = Pick<
  TryWorkflow,
  | "t"
  | "uploadStatus"
  | "statusMessage"
  | "preparedReview"
  | "effectiveReviewCount"
  | "handleFileChange"
>;

export function UploadStep({
  t,
  uploadStatus,
  statusMessage,
  preparedReview,
  effectiveReviewCount,
  handleFileChange,
}: UploadStepProps) {
  return (
    <Card className="rounded-lg border-border bg-background shadow-none">
      <CardHeader>
        <CardTitle>{t.try.upload.title}</CardTitle>
        <CardDescription>{t.try.upload.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-3 rounded-md border border-dashed border-border bg-muted/25 p-6">
          <label className="flex flex-col gap-3 text-sm font-medium">
            <span>{t.try.uploadFileLabel}</span>
            <Input
              type="file"
              accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={handleFileChange}
              disabled={uploadStatus === "uploading"}
            />
          </label>
          <p className="text-sm" data-state={uploadStatus}>
            {statusMessage}
          </p>
        </div>

        <div className="rounded-md border border-border bg-muted/25 p-5 text-sm leading-relaxed text-muted-foreground">
          <ol className="list-decimal space-y-2 pl-5">
            {t.try.upload.instructions.map((instruction) => (
              <li key={instruction}>{instruction}</li>
            ))}
          </ol>
          <p className="mt-3 text-xs">{t.try.upload.helper}</p>
          <div className="relative mt-4 overflow-hidden rounded-md border border-border bg-background p-3">
            <Image
              src="/images/Compatible_Browswer_Extensions.png"
              alt={t.try.extensionImageAlt}
              width={960}
              height={600}
              className="h-auto w-full object-contain"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold">{t.try.previewLabel}</h3>
            {preparedReview && (
              <span className="text-xs font-medium uppercase tracking-wide text-primary/80">
                {t.try.reviewCountLabel(effectiveReviewCount)}
              </span>
            )}
          </div>
          <div className="rounded-md border border-border bg-background p-4">
            {preparedReview ? (
              <ul className="space-y-3 text-sm">
                {preparedReview.preview.map((entry) => (
                  <li key={entry.index} className="space-y-1">
                    <p className="font-medium text-primary/80">
                      {entry.index}. {entry.date}
                    </p>
                    <p className="text-muted-foreground">{entry.combined}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">{t.try.previewEmpty}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
