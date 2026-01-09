'use client'
import { Plus } from "lucide-react";
import OtherStageItem from "./OtherStageItem";
import { useTimelineStore } from "../stores/useTimeLineStore";
import { useApplicationStore } from "../stores/useApplicationStore";
import { ScheduleResult } from "@/shared/types";
import { useState } from "react";
import AddSchedule from "./AddSchedule";
import StageWrapper from "./common/StageWrapper";
import { ACTIVE_STAGE_STYLES, STATUS_FONT_STYLES } from "../constants/styles";

export default function InterViewStage() {
  const interviewStageTimeLine =
    useApplicationStore(state => state.data?.applicationStageTimeLine.interviewStageTimeLine ?? []);
  const activeStage = useTimelineStore(state => state.activeStage);
  const [open, setOpen] = useState(false);

  const result: ScheduleResult = interviewStageTimeLine.every(
    stage => stage.scheduleResult === 'PASS'
  )
    ? 'PASS'
    : interviewStageTimeLine.every(
      stage => stage.scheduleResult === 'FAILED'
    )
      ? 'FAILED'
      : 'WAITING';

  return (
    <StageWrapper number={3} stage="interview">
      <div className='transition-opacity opacity-90'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className={`font-bold text-lg text-slate-900 dark:text-slate-100 ${activeStage === 'interview' && ACTIVE_STAGE_STYLES.font} ${STATUS_FONT_STYLES[result]}`}>
            면접 전형
          </h3>
          <div
            onClick={() => { setOpen(prev => !prev) }}
            className='p-2 text-slate-400 hover:text-brand-500 transition-colors cursor-pointer'
            title="전형 추가"
          >
            <Plus className='w-5 h-5 mr-1' />
          </div>
        </div>
        <div className={`space-y-3 p-3 rounded-xl transition-all ${activeStage === 'interview' && ACTIVE_STAGE_STYLES.bg}`}>
          {interviewStageTimeLine?.map((stage) => (
            <OtherStageItem
              key={stage.stageId}
              id={stage.stageId}
              title={stage.scheduleName}
              datetime={stage.startedAt}
              scheduleResult={stage.scheduleResult}
              type='interview'
            />
          ))}
          {open && <AddSchedule setOpen={setOpen} />}
        </div>
      </div>
    </StageWrapper>
  );
}