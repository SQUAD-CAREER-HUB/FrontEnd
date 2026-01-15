import { Label } from "@/shared/components/ui/label";
import { DropDown } from "@/shared/components/DropDown";
import { useState } from "react";
import { applicationMethodOptions, deadlineOptions, documentStatusOptions } from "../../constants"
import StatusButtonGroup from "../StatusButtonGroup";
import { BottomActiveButtons } from "../BottomActiveButtons";
import { ScheduleResult } from "@/shared/types";

interface DocumentStageFormProps {
  onCancel?: () => void;
  onSave?: () => void;
}

export default function DocumentStageForm({ onCancel, onSave }: DocumentStageFormProps) {
  const [documentStatus, setDocumentStatus] = useState("")
  const [applicationMethod, setApplicationMethod] = useState("")
  const [deadline, setDeadline] = useState("");
  const [currentStatus, setCurrentStatus] = useState<ScheduleResult>('WAITING');

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div>
          <Label className="text-[10px] text-slate-400 font-bold mb-1.5 block uppercase tracking-wider">
            서류 상태
          </Label>
          <DropDown
            options={documentStatusOptions}
            value={documentStatus}
            onValueChange={setDocumentStatus}
            placeholder="상태 선택"
          />
        </div>
        <div>
          <Label className="text-[10px] text-slate-400 font-bold mb-1.5 block uppercase tracking-wider">
            지원 방식
          </Label>
          <DropDown
            options={applicationMethodOptions}
            value={applicationMethod}
            onValueChange={setApplicationMethod}
            placeholder="방식 선택"
          />
        </div>
        <div>
          <Label className="text-[10px] text-slate-400 font-bold mb-1.5 block uppercase tracking-wider">
            마감 일시
          </Label>
          <DropDown
            options={deadlineOptions}
            value={deadline}
            onValueChange={setDeadline}
            placeholder="날짜 선택"
          />
        </div>
      </div>
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-col items-start gap-1">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
              전형 결과
            </span>
            <StatusButtonGroup status={currentStatus} onStatusChange={setCurrentStatus} />
          </div>
          <BottomActiveButtons onCancel={onCancel} onSave={onSave} />
        </div>
      </div>
    </>
  );
}