import { Label } from "@/shared/components/ui/label";
import { DropDown } from "@/shared/components/DropDown";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { applicationMethodOptions, documentStatusOptions } from "../../constants"
import StatusButtonGroup from "../StatusButtonGroup";
import { BottomActiveButtons } from "../BottomActiveButtons";
import { ScheduleResult } from "@/shared/types";
import { useGetApplicationDetail } from "../../hooks/useGetApplicationDetail";
import { useUpdateDocumentStage } from "../../hooks/useUpdateDocumentStage";
import { ApplicationMethod, SubmissionStatus } from "../../types";
import { Input } from "@/shared/components/ui/input";

interface DocumentStageFormProps {
  onCancel?: () => void;
  onSave?: () => void;
}

export default function DocumentStageForm({ onCancel, onSave }: DocumentStageFormProps) {
  const params = useParams();
  const applicationId = Number(params.id);
  const { data } = useGetApplicationDetail(applicationId);
  const { mutate: updateDocumentStage, isPending } = useUpdateDocumentStage(applicationId);

  const [submissionStatus, setSubmissionStatus] = useState<string>("");
  const [applicationMethod, setApplicationMethod] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [scheduleResult, setScheduleResult] = useState<ScheduleResult>('WAITING');

  useEffect(() => {
    if (data) {
      const { applicationInfo, applicationStageTimeLine } = data;
      const docsStage = applicationStageTimeLine.docsStageTimeLine;

      setSubmissionStatus(docsStage?.submissionStatus ?? '');
      setApplicationMethod(applicationInfo?.applicationMethod ?? '');
      setDeadline(applicationInfo?.deadline ?? '');
      setScheduleResult(docsStage?.scheduleResult ?? 'WAITING');
    }
  }, [data]);

  const isFormValid = deadline && applicationMethod && submissionStatus && scheduleResult;

  const handleSave = () => {
    if (!isFormValid) return;

    updateDocumentStage(
      {
        deadline,
        applicationMethod: applicationMethod as ApplicationMethod,
        submissionStatus: submissionStatus as SubmissionStatus,
        scheduleResult,
      },
      {
        onSuccess: () => {
          onSave?.();
        },
      }
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div>
          <Label className="text-[10px] text-slate-400 font-bold mb-1.5 block uppercase tracking-wider">
            서류 상태
          </Label>
          <DropDown
            options={documentStatusOptions}
            value={submissionStatus}
            onValueChange={setSubmissionStatus}
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
          <Input
            type="datetime-local"
            value={deadline ? deadline.slice(0, 16) : ''}
            onChange={(e) => setDeadline(e.target.value ? `${e.target.value}:00` : '')}
            className="h-9 text-sm"
          />
        </div>
      </div>
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-col items-start gap-1">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
              전형 결과
            </span>
            <StatusButtonGroup status={scheduleResult} onStatusChange={setScheduleResult} />
          </div>
          <BottomActiveButtons onCancel={onCancel} onSave={handleSave} loading={isPending} disabled={!isFormValid} />
        </div>
      </div>
    </>
  );
}