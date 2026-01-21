'use client'

import { ScheduleResult } from "@/shared/types";
import ViewCard from "./ViewCard";
import EditCard from "./EditCard";
import { useStageEditor } from "../../hooks/useStageEditor";

export type Mode = 'edit' | 'view';

interface OtherStageItemProps {
  id: number;
  title: string;
  datetime: string;
  endDatetime?: string;
  location?: string;
  scheduleResult: ScheduleResult;
  type: 'interview' | 'other'
}

export default function OtherStageItem({
  id,
  title,
  datetime,
  endDatetime,
  location,
  scheduleResult,
  type,
}: OtherStageItemProps) {
  const { isEditing } = useStageEditor(id, type);

  return (
    <>
      {isEditing ? (
        <EditCard
          id={id}
          type={type}
          initialData={{
            scheduleName: title,
            startedAt: datetime,
            endedAt: endDatetime,
            location,
            scheduleResult,
          }}
        />
      ) : (
        <ViewCard
          id={id}
          title={title}
          datetime={datetime}
          scheduleResult={scheduleResult}
          type={type}
        />
      )}
    </>
  );
}