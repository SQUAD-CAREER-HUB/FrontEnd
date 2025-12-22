'use client'
import { Button } from "../ui/button";
import TimelineStepNumber from "./TimeLineStepNumber";

export interface FinalResultStageProps {
  result?: 'passed' | 'rejected';
  onPass?: () => void;
  onFail?: () => void;
}


export default function FinalResultStage({ 
  result = 'rejected', 
  onPass, 
  onFail 
}: FinalResultStageProps) {
  const isRejected = result === 'rejected';
  
  return (
    <div className='relative flex gap-6 mb-10 group z-20'>
      <TimelineStepNumber isCompleted={true} />
      <div className={`flex-1 rounded-xl p-5 border shadow-sm flex justify-between items-center transition-colors ${
        isRejected 
          ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900'
          : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900'
      }`}>
        <div>
          <h3 className={`font-bold text-lg ${
            isRejected 
              ? 'text-red-800 dark:text-red-400'
              : 'text-green-800 dark:text-green-400'
          }`}>
            {isRejected ? '최종 불합격' : '최종 합격'}
          </h3>
        </div>
        <div className='flex gap-2'>
          <Button 
            variant={'xs'} 
            size={'xs'} 
            onClick={onPass}
            className='bg-green-500 text-white border-green-500 shadow-sm'
          >
            합격 처리
          </Button>
          <Button 
            variant={'xs'} 
            size={'xs'} 
            onClick={onFail}
            className='bg-white dark:bg-slate-800 border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
          >
            불합격 처리
          </Button>
        </div>
      </div>
    </div>
  );
}
