'use client'

import { ScheduleResult } from "@/types";
import { useState } from "react";
import ViewCard from "./ViewCard";
import EditCard from "./EditCard";
import { useApplicationStore } from "../../stores/useApplicationStore";
import { useTimelineStore } from "../../stores/useTimeLineStore";

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
  const [result, setResult] = useState<ScheduleResult>(scheduleResult);
  const [mode, setMode] = useState<Mode>('view');
  const editingEtcStageId = useTimelineStore(state => state.editingEtcStageId);
  const editingInterviewStageId = useTimelineStore(state => state.editingInterviewStageId);
  const isEditing = id === editingEtcStageId && type === 'other' || id === editingInterviewStageId && type === 'interview';
  return (
    <>
      {isEditing ? (
        <EditCard
          type={type}
        />
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