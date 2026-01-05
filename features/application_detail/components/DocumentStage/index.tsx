"use client"
import { useState } from "react"
import { useTimelineStore } from "../../stores/useTimeLineStore"
import TimelineStepNumber from "../TimeLineStepNumber"
import { ScheduleResult } from "@/types"
import { Button } from "@/components/ui/button"
import { Pen } from "lucide-react"
import DocumentStageForm from "./DocumentStageForm"
import ViewCard from "./ViewCard"

export default function DocumentStage({
}) {
  const activeStage = useTimelineStore(state => state.activeStage);

  const activeBorder = "border-brand-500 ring-2 ring-brand-100 shadow-md transform scale-[1.01] dark:bg-slate-900 dark:ring-brand-900/30 dark:border-slate-800"
  const activeBg = {
    WAIING: '',
    PASSED: 'bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800',
    FAILED: 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800'
  }
  const activeFont = {
    WAIING: ' text-slate-900 dark:text-slate-100',
    PASSED: 'text-green-800 dark:text-green-400',
    FAILED: 'text-red-800 dark:text-red-400',
  }
  const [status, setStatus] = useState<ScheduleResult>('WAITING');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  return (
    <div className='relative flex gap-6 mb-10 group z-20'>
      <TimelineStepNumber number={1} stage='document' />
      <div className={`flex-1 rounded-xl p-5 shadow-sm transition-all border ${activeStage === 'document' && status === 'WAITING' && activeBorder} ${activeBg[status]}`}>
        <div className='flex justify-between items-center mb-5'>
          <h3 className={`font-bold text-lg ${activeFont[status]}`}>서류 전형</h3>
          <Button
            onClick={() => { setIsEditing(prev => !prev); }}
            variant="ghost"
            className="p-1.5 text-slate-300 hover:text-brand-500"
          >
            <Pen className="w-4 h-4" />
          </Button>
        </div>

        {isEditing ? (
          <DocumentStageForm />
        ) : (
          <ViewCard />
        )}
      </div>
    </div>
  )
}