'use client'
import { Plus } from "lucide-react";
import OtherStageItem from "./OtherStageItem";
import { useState } from "react";
import { useTimelineStore } from "../stores/useTimeLineStore";
import { useApplicationStore } from "../stores/useApplicationStore";
import AddSchedule from "./AddSchedule";
import StageWrapper from "./common/StageWrapper";
import { ACTIVE_STAGE_STYLES } from "../constants/styles";

export default function OtherStage() {
  const etcStageTimeLine =
    useApplicationStore(state => state.data?.applicationStageTimeLine.etcStageTimeLine);
  const [open, setOpen] = useState(true);
  const activeStage = useTimelineStore(state => state.activeStage);

  return (
    <StageWrapper number={2} stage="other">
      <div className='transition-opacity opacity-90'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className={`font-bold text-lg text-slate-900 dark:text-slate-100 ${activeStage === 'other' && ACTIVE_STAGE_STYLES.font}`}>
            기타 전형
          </h3>
          <div
            onClick={() => { setOpen(prev => !prev) }}
            className='p-2 text-slate-400 hover:text-brand-500 transition-colors cursor-pointer'
            title="전형 추가"
          >
            <Plus className='w-5 h-5 mr-1' />
          </div>
        </div>
        <div className={`space-y-3 p-3 rounded-xl transition-all ${activeStage === 'other' && ACTIVE_STAGE_STYLES.bg}`}>
          {etcStageTimeLine?.map((stage) => (
            <OtherStageItem
              key={stage.stageId}
              id={stage.stageId}
              title={stage.scheduleName}
              datetime={stage.startedAt}
              scheduleResult={stage.scheduleResult}
              type='other'
            />
          ))}
          {open && <AddSchedule setOpen={setOpen} />}
        </div>
      </div>
    </StageWrapper>
  );
}