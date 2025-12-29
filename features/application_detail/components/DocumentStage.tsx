"use client"

import StatusButtonGroup from "./StatusButtonGroup"
import { Label } from "@/components/ui/label"
import { DropDown } from "@/components/DropDown"
import { useState } from "react"
import { useTimelineStore } from "../stores/useTimeLineStore"
import { useShallow } from "zustand/shallow"
import TimelineStepNumber from "./TimeLineStepNumber"
import { applicationMethodOptions, deadlineOptions, documentStatusOptions } from "../constants"
import { ApplicationStatus } from "@/types"

export default function DocumentStage({
}) {
  const activeStage = useTimelineStore(state => state.activeStage);
  const [documentStatus, setDocumentStatus] = useState("")
  const [applicationMethod, setApplicationMethod] = useState("")
  const [deadline, setDeadline] = useState("")
  const activeBorder = "border-brand-500 ring-2 ring-brand-100 shadow-md transform scale-[1.01] dark:bg-slate-900 dark:ring-brand-900/30 dark:border-slate-800"
  const activeBg = {
    pending: '',
    passed: 'bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800',
    failed: 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800'
  }
  const activeFont = {
    pending: ' text-slate-900 dark:text-slate-100',
    passed: 'text-green-800 dark:text-green-400',
    failed: 'text-red-800 dark:text-red-400',
  }
  const [status, setStatus] = useState<ApplicationStatus>('pending');
  return (
    <div className='relative flex gap-6 mb-10 group z-20'>
      <TimelineStepNumber number={1} stage='document' />
      <div className={`flex-1 rounded-xl p-5 shadow-sm transition-all border ${activeStage === 'document' && status === 'pending' && activeBorder} ${activeBg[status]}`}>
        <div className='flex justify-between items-center mb-5'>
          <h3 className={`font-bold text-lg ${activeFont[status]}`}>서류 전형</h3>
          <StatusButtonGroup status={status} onStatusChange={setStatus} />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          <div className='flex flex-col'>
            <Label htmlFor="documentStatus" className="text-[10px] text-slate-900 dark:text-slate-100 font-bold mb-1.5 ml-1">
              서류 상태 <span className="text-red-500">*</span>
            </Label>
            <DropDown
              options={documentStatusOptions}
              value={documentStatus}
              onValueChange={setDocumentStatus}
              placeholder="상태 선택"
            />
          </div>
          <div className='flex flex-col'>
            <Label htmlFor="applicationMethod" className="text-[10px] text-slate-900 dark:text-slate-100 font-bold mb-1.5 ml-1">
              지원 방식 <span className="text-red-500">*</span>
            </Label>
            <DropDown
              options={applicationMethodOptions}
              value={applicationMethod}
              onValueChange={setApplicationMethod}
              placeholder="방식 선택"
            />
          </div>
          <div className='flex flex-col'>
            <Label htmlFor="deadline" className="text-[10px] text-slate-900 dark:text-slate-100 font-bold mb-1.5 ml-1">
              마감 일시 <span className="text-red-500">*</span>
            </Label>
            <DropDown
              options={deadlineOptions}
              value={deadline}
              onValueChange={setDeadline}
              placeholder="날짜 선택"
            />
          </div>
        </div>
      </div>
    </div>
  )
}