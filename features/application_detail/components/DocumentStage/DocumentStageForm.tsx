import { DropDown } from "@/components/DropDown";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { applicationMethodOptions, deadlineOptions, documentStatusOptions } from "../../constants"
import StatusButtonGroup from "../StatusButtonGroup";
import { BottomActiveButtons } from "../BottomActiveButtons";

export default function DocumentStageForm() {
  const [documentStatus, setDocumentStatus] = useState("")
  const [applicationMethod, setApplicationMethod] = useState("")
  const [deadline, setDeadline] = useState("");
  const [currentStatus, setCurrentStatus] = useState('WAITING');
  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5'>
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
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
            <div className="flex flex-col items-start gap-1">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                전형 결과
              </span>
              <StatusButtonGroup status={currentStatus} onStatusChange={setCurrentStatus} />
            </div>
            <BottomActiveButtons />
          </div>
        </div>
      </div>
    </>
  )
}