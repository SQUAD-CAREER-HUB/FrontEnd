'use client'

import { ApplicationStage } from "@/types";
import { useTimelineStore } from "../stores/useTimeLineStore";
import { Check } from "lucide-react";

interface TimelineStepNumberProps {
  number?: number;
  stage: ApplicationStage;
}

// 3. 타임라인 스텝 번호 컴포넌트
export default function TimelineStepNumber({
  number,
  stage
}: TimelineStepNumberProps) {
  const isActive = useTimelineStore((state) => state.isStageActive(stage))
  const isCompleted = useTimelineStore((state) => state.isStageCompleted(stage))
  const getStatusClasses = () => {
    if (isCompleted) {
      return 'bg-green-500 border-green-500 text-white'
    }
    if (isActive) {
      return 'bg-white dark:bg-slate-900 border-brand-500 text-brand-600 ring-4 ring-brand-50 dark:ring-brand-900/30'
    }
    return 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400'
  }
  
  return (
    <div className={`relative z-10 w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center shadow-sm flex-shrink-0 transition-colors
      ${getStatusClasses()}
    `}>
      {number && (
        isCompleted? (
          <Check className="w-5 h-5"/>
        ):
        (
        <span className='text-xs md:text-sm font-bold'>
          {number}
        </span>
        )  
    )}
    </div>
  );
}