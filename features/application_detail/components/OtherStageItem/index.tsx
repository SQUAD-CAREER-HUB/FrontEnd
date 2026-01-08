'use client'

import { ScheduleResult } from "@/shared/types";
import { useState } from "react";
import ViewCard from "./ViewCard";
import EditCard from "./EditCard";
import { useStageEditor } from "../../hooks/useStageEditor";

export type Mode = 'edit' | 'view';

interface OtherStageItemProps {
  id: number;
  title: string;
  datetime: string;
  scheduleResult: ScheduleResult;
  isEditing?: boolean;
  type: 'interview' | 'other'
}

export default function OtherStageItem({
  id,
  title,
  datetime,
  scheduleResult,
  type,
}: OtherStageItemProps) {
  const [result] = useState<ScheduleResult>(scheduleResult);
  const { isEditing } = useStageEditor(id, type);

  return (
    <>
      {isEditing ? (
        <EditCard type={type} />
      ) : (
        <ViewCard
          id={id}
          title={title}
          datetime={datetime}
          scheduleResult={result}
          type={type}
        />
      )}
    </>
  );
}