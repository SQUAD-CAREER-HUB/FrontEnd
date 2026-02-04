'use client'

import { ApplicationStage } from "@/shared/types";
import { useParams } from "next/navigation";
import { useGetApplicationDetail } from "../../../hooks/useGetApplicationDetail";
import { isStageAllPassed, isStageHasAnyFail } from "../../../lib/timelineSync";
import { toStageEnum } from "./constants";
import CompletedStep from "./CompletedStep";
import FailedStep from "./FailedStep";
import ActiveStep from "./ActiveStep";
import DefaultStep from "./DefaultStep";

interface TimelineStepNumberProps {
  number?: number;
  stage: ApplicationStage;
}

export default function TimelineStepNumber({
  number,
  stage
}: TimelineStepNumberProps) {
  const params = useParams();
  const applicationId = Number(params.id);
  const { data } = useGetApplicationDetail(applicationId);

  const rawStage = data?.applicationInfo.currentStageType || 'DOCUMENT';
  const currentStage = toStageEnum(rawStage);

  const isActive = currentStage === stage;
  const isCompleted = data ? isStageAllPassed(stage, data) : false;
  const hasFail = data ? isStageHasAnyFail(stage, data) : false;

  if (isCompleted) return <CompletedStep />;
  if (hasFail) return <FailedStep />;
  if (isActive) return <ActiveStep number={number} />;
  return <DefaultStep number={number} />;
}
