"use client";

import { MODEL_OPTIONS, type ModelId } from "@/config/models";
import type { FocusValue, PositionValue } from "@/config/analysis";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { TryWorkflow } from "@/features/try/use-try-workflow";

type ConfigureStepProps = Pick<
  TryWorkflow,
  | "t"
  | "language"
  | "productInfo"
  | "setProductInfo"
  | "modelId"
  | "setModelId"
  | "selectedModel"
  | "focus"
  | "setFocus"
  | "position"
  | "setPosition"
  | "question"
  | "setQuestion"
  | "focusOptions"
  | "positionOptions"
>;

export function ConfigureStep({
  t,
  language,
  productInfo,
  setProductInfo,
  modelId,
  setModelId,
  selectedModel,
  focus,
  setFocus,
  position,
  setPosition,
  question,
  setQuestion,
  focusOptions,
  positionOptions,
}: ConfigureStepProps) {
  return (
    <Card className="rounded-lg border-border bg-background shadow-none">
      <CardHeader>
        <CardTitle>{t.try.configure.title}</CardTitle>
        <CardDescription>{t.try.configure.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium">
            <span>{t.try.configure.productLabel}</span>
            <Input
              value={productInfo}
              onChange={(event) => setProductInfo(event.target.value)}
              placeholder={t.try.configure.productPlaceholder}
            />
          </label>
          <label className="space-y-2 text-sm font-medium">
            <span>{t.try.configure.modelLabel}</span>
            <Select
              value={modelId}
              onValueChange={(value) => setModelId(value as ModelId)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MODEL_OPTIONS.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.label[language]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {selectedModel?.helper[language] ?? t.try.configure.modelHelper}
            </p>
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium">
            <span>{t.try.configure.focusLabel}</span>
            <Select
              value={focus}
              onValueChange={(value) => setFocus(value as FocusValue)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {focusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
          <label className="space-y-2 text-sm font-medium">
            <span>{t.try.configure.positionLabel}</span>
            <Select
              value={position}
              onValueChange={(value) => setPosition(value as PositionValue)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {positionOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
        </div>

        <label className="space-y-2 text-sm font-medium">
          <span>{t.try.configure.questionLabel}</span>
          <Textarea
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder={t.try.configure.questionPlaceholder}
            rows={3}
          />
          <p className="text-xs text-muted-foreground">
            {t.try.configure.questionHelper}
          </p>
        </label>
      </CardContent>
    </Card>
  );
}
