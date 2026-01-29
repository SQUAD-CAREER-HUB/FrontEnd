'use client'

import { ScheduleResult } from "@/shared/types";
import ViewCard from "./ViewCard";
import InterviewEditCard from "./InterviewEditCard";
import EtcEditCard from "./EtcEditCard";
import { useStageEditor } from "../../../hooks/useStageEditor";

export type Mode = 'edit' | 'view';

interface ScheduleCardProps {
  id: number;
  title: string;
  datetime: string;
  endDatetime?: string;
  location?: string;
  scheduleResult: ScheduleResult;
  type: 'interview' | 'other'
}

export default function ScheduleCard({
  id,
  title,
  datetime,
  endDatetime,
  location,
  scheduleResult,
  type,
}: ScheduleCardProps) {
  const { isEditing } = useStageEditor(id, type);

  if (!isEditing) {
    return (
      <ViewCard
        id={id}
        title={title}
        datetime={datetime}
        scheduleResult={scheduleResult}
        type={type}
      />
    );
  }

  if (type === 'interview') {
    return (
      <InterviewEditCard
        id={id}
        initialData={{
          scheduleName: title,
          startedAt: datetime,
          location,
          scheduleResult,
        }}
      />
    );
  }

  return (
    <EtcEditCard
      id={id}
      initialData={{
        scheduleName: title,
        startedAt: datetime,
        endedAt: endDatetime,
        scheduleResult,
      }}
    />
  );
}