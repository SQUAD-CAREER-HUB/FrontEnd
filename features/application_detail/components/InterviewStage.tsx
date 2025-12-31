'use client'
import { Plus } from "lucide-react";
import { Button } from "../../../components/ui/button";
import OtherStageItem from "./OtherStageItem";
import TimelineStepNumber from "./TimeLineStepNumber";
import { useTimelineStore } from "../stores/useTimeLineStore";
import { useApplicationStore } from "../stores/useApplicationStore";
import { ScheduleResult } from "@/types";


export default function InterViewStage() {
const interviewStageTimeLine =
  useApplicationStore(state => state.data?.applicationStageTimeLine.interviewStageTimeLine ?? []);
  const activeStage = useTimelineStore(state => state.activeStage);
  const activeClasses = {
    font: 'font-bold text-lg text-brand-600 dark:text-brand-400',
    bg: 'bg-brand-50/30 dark:bg-brand-900/10 border border-brand-100 dark:border-brand-900/50',
  }
  const activeFont = {
    WAITING: 'text-slate-900 dark:text-slate-100',
    PASS: 'text-green-800 dark:text-green-400',
    FAILED: 'text-red-800 dark:text-red-400',
  };
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
    <div className='relative flex gap-6 mb-10 group z-20'>
      <TimelineStepNumber number={3} stage="interview" />
      <div className='flex-1 transition-opacity opacity-90'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className={`font-bold text-lg text-slate-900 dark:text-slate-100 ${activeStage === 'interview' && activeClasses.font} ${activeFont[result]}`}>면접 전형</h3>
          <Button
            variant={'xs'}
            size={'xs'}
            onClick={() => { }}
            className='text-brand-500 bg-brand-50 dark:bg-brand-900/20 hover:bg-brand-100 dark:hover:bg-brand-900/40 px-3 py-1 gap-0 rounded-lg transition-colors'
          >
            <Plus className='w-3 h-3 mr-1' />
            추가
          </Button>
        </div>
        <div className={`space-y-3 p-3 rounded-xl transition-all ${activeStage === 'interview' && activeClasses.bg}`}>
          {interviewStageTimeLine?.map((stage, index) => (
            <OtherStageItem
              id={stage.stageId}
              title={stage.scheduleName}
              datetime={stage.startedAt}
              scheduleResult = {stage.scheduleResult}

            />
          ))}
        </div>
      </div>
    </div>
  );
}