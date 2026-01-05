'use client'
import { useState } from "react";
import { Button } from "../../../../components/ui/button";
import TimelineStepNumber from "../TimeLineStepNumber";
import { ScheduleResult } from "@/types";
import { Pen } from "lucide-react";
import EditCard from "./EditCard";
import ViewCard from "./ViewCard";

export interface FinalResultStageProps {
  result?: 'passed' | 'rejected';
  onPass?: () => void;
  onFail?: () => void;
}


export default function FinalResultStage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className='relative flex gap-6 mb-10 group z-20'>
      <TimelineStepNumber number={4} stage='result' />
      <div className='flex-1 rounded-xl p-5 shadow-sm transition-all border bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800'>
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">최종 결과</h3>
          <Button
            onClick={() => {setIsEditing(prev =>!prev)}}
            variant="ghost"
            className="p-1.5 text-slate-300 hover:text-brand-500"
          >
            <Pen className="w-4 h-4" />
          </Button>
        </div>
        <div className='pt-3 border-t border-slate-100 dark:border-slate-800'>
          {
          isEditing? (
          <EditCard/>
          ):(
            <ViewCard />
          )
        }
        </div>
      </div>
    </div>
  );
}
