'use client'
import { DropDown } from "../DropDown";
import { Label } from "../ui/label";
import StatusButtonGroup from "./StatusButtonGroup";
import TimelineStepNumber from "./TimeLineStepNumber";

interface DocumentStageProps {
  onStatusChange?: (status: 'pending' | 'passed' | 'failed') => void;
}
// 4. 서류 전형 단계 컴포넌트
export default function DocumentStage({ 
  onStatusChange 
}: DocumentStageProps) {
  return (
    <div className='relative flex gap-6 mb-10 group z-20'>
      <TimelineStepNumber number={1} isCompleted={false} />
      <div className='flex-1 rounded-xl p-5 shadow-sm transition-all bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800'>
        <div className='flex justify-between items-center mb-5'>
          <h3 className='font-bold text-lg text-green-800 dark:text-green-400'>서류 전형</h3>
          <StatusButtonGroup onStatusChange={onStatusChange} />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          <div className='flex flex-col'>
            <Label htmlFor="payment" className="text-[10px] text-slate-900 dark:text-slate-100 font-bold mb-1.5 ml-1 ">
              서류 상태 <span className="text-red-500">*</span>
            </Label>
            <DropDown />
          </div>
          <div className='flex flex-col'>
            <Label htmlFor="payment" className="text-[10px] text-slate-900 dark:text-slate-100 font-bold mb-1.5 ml-1 ">
              지원 방식 <span className="text-red-500">*</span>
            </Label>
            <DropDown />
          </div>
          <div className='flex flex-col'>
            <Label htmlFor="payment" className="text-[10px] text-slate-900 dark:text-slate-100 font-bold mb-1.5 ml-1 ">
              마감 일시 <span className="text-red-500">*</span>
            </Label>
            <DropDown />
          </div>
        </div>
      </div>
    </div>
  );
}