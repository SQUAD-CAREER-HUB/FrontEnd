'use client'
import { Clock, Plus } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import OtherStageItem from "./OtherStageItem";
import { StageData } from "@/types";
import TimelineStepNumber from "./TimeLineStepNumber";
import { useState } from "react";

interface OtherStageProps {
  type: '기타 전형' | '면접 전형';
}

export default function OtherStage({ 
  type, 
}: OtherStageProps) {
  const [otherStages] = useState<StageData[]>([
    { title: '제목', datetime: '2025. 12. 22. 오전 01:28 ~ 오전 02:28' },
  ])
  const onStatusChange = (index: number, status: 'pending' | 'passed' | 'failed') => {
  }
  return (
    <div className='relative flex gap-6 mb-10 group z-20'>
      <TimelineStepNumber isCompleted={true} />
      <div className='flex-1 transition-opacity opacity-90'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='font-bold text-lg text-slate-900 dark:text-slate-100'>{type}</h3>
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
        <div className='space-y-3 p-3 rounded-xl transition-all'>
          {otherStages.map((stage, index) => (
            <OtherStageItem 
              key={index}
              title={stage.title}
              datetime={stage.datetime}
              onStatusChange={(status) => onStatusChange?.(index, status)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}