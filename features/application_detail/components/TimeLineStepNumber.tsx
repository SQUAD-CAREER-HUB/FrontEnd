'use client'

import { ApplicationStage } from "@/shared/types";
import { Check } from "lucide-react";
import { useParams } from "next/navigation";
import { useGetApplicationDetail } from "../hooks/useGetApplicationDetail";

const STAGE_ORDER: ApplicationStage[] = ['DOCUMENT', 'ETC', 'INTERVIEW', 'APPLICATION_CLOSE'];

const STAGE_KO_TO_EN: Record<string, ApplicationStage> = {
  '서류 전형': 'DOCUMENT',
  '기타 전형': 'ETC',
  '면접 전형': 'INTERVIEW',
  '지원 종료': 'APPLICATION_CLOSE',
};

function toStageEnum(value: string): ApplicationStage {
  return STAGE_KO_TO_EN[value] || (value as ApplicationStage);
}

interface TimelineStepNumberProps {
  number?: number;
  stage: ApplicationStage;
}

// 3. 타임라인 스텝 번호 컴포넌트
export default function TimelineStepNumber({
  number,
  stage
}: TimelineStepNumberProps) {
  const params = useParams();
  const applicationId = Number(params.id);
  const { data } = useGetApplicationDetail(applicationId);

  const rawStage = data?.applicationInfo.currentStageType || 'DOCUMENT';
  const currentStage = toStageEnum(rawStage);
  const currentIndex = STAGE_ORDER.indexOf(currentStage);
  const stageIndex = STAGE_ORDER.indexOf(stage);

  const isActive = currentStage === stage;
  const isCompleted = stageIndex < currentIndex;
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