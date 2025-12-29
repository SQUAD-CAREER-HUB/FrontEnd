'use client'
import { Plus } from "lucide-react";
import { Button } from "../../../components/ui/button";
import OtherStageItem from "./OtherStageItem";
import { StageData } from "@/types";
import TimelineStepNumber from "./TimeLineStepNumber";
import { useState } from "react";
import { useTimelineStore } from "../stores/useTimeLineStore";

export default function OtherStage() {
  const [item] = useState<StageData[]>([
    { title: '제목', datetime: '2025. 12. 22. 오전 01:28 ~ 오전 02:28' },
  ]);
  const activeStage = useTimelineStore(state => state.activeStage);
  const activeClasses = {
    font: 'font-bold text-lg text-brand-600 dark:text-brand-400',
    bg: 'bg-brand-50/30 dark:bg-brand-900/10 border border-brand-100 dark:border-brand-900/50',
  }
  return (
    <div className='relative flex gap-6 mb-10 group z-20'>
      <TimelineStepNumber number={2} stage="other"/>
      <div className='flex-1 transition-opacity opacity-90'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className={`font-bold text-lg text-slate-900 dark:text-slate-100 ${activeStage === 'other' && activeClasses.font}`}>기타 전형</h3>
          <Button 
            variant={'xs'} 
            size={'xs'} 
            onClick={() =>{}}
            className='text-brand-500 bg-brand-50 dark:bg-brand-900/20 hover:bg-brand-100 dark:hover:bg-brand-900/40 px-3 py-1 gap-0 rounded-lg transition-colors'
          >
            <Plus className='w-3 h-3 mr-1' />
            추가
          </Button>
        </div>
        <div className={`space-y-3 p-3 rounded-xl transition-all ${activeStage === 'other' && activeClasses.bg}`}>
          {item.map((stage, index) => (
            <OtherStageItem 
              key={index}
              title={stage.title}
              datetime={stage.datetime}
            />
          ))}
        </div>
      </div>
    </div>
  );
}