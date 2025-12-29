'use client'
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import TimelineStepNumber from "./TimeLineStepNumber";
import { ApplicationStatus } from "@/types";
import StatusButtonGroup from "./StatusButtonGroup";

export interface FinalResultStageProps {
  result?: 'passed' | 'rejected';
  onPass?: () => void;
  onFail?: () => void;
}


export default function FinalResultStage() {
  const [status, setStatus] = useState<ApplicationStatus>('passed');
  const resultConfig: Record<ApplicationStatus, {
    bg: string;
    font: string;
    label: string;
  }> = {
    pending: {
      bg: 'border shadow-sm flex justify-between items-center transition-colors bg-slate-50/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700',
      font: '',
      label: '지원 종료',
    },
    passed: {
      bg: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900',
      font: 'text-green-800 dark:text-green-400',
      label: '최종 합격',
    },
    failed: {
      bg: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900',
      font: 'text-red-800 dark:text-red-400',
      label: '최종 불합격',
    },
  };

  return (
    <div className='relative flex gap-6 mb-10 group z-20'>
      <TimelineStepNumber number={4} stage='result' />
      <div className={`flex-1 rounded-xl p-5 border shadow-sm flex justify-between items-center transition-colors ${resultConfig[status].bg
        }`}>
        <div>
          <h3 className={`font-bold text-lg ${resultConfig[status].font
            }`}>
            {resultConfig[status].label}
          </h3>
        </div>
        <div className='flex gap-2'>
          <StatusButtonGroup
            status={status}
            onStatusChange={setStatus}
            labels={{
              passed: '합격 처리',
              failed: '불합격 처리',
            }}
          />

        </div>
      </div>
    </div>
  );
}
