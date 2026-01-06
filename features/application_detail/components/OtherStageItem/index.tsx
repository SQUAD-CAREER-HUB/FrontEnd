'use client'

import { ScheduleResult } from "@/types";
import { useState } from "react";
import ViewCard from "./ViewCard";
import EditCard from "./EditCard";
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
  const [result] = useState<ScheduleResult>(scheduleResult);
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