import { Label } from "@/shared/components/ui/label";
import { DropDown } from "@/shared/components/DropDown";
import { DateTimeInput } from "@/shared/components/DateTimeInput";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { applicationMethodOptions, documentStatusOptions, APPLICATION_METHOD_LABEL_TO_VALUE } from "../../../constants"
import StatusButtonGroup from "../../common/StatusButtonGroup";
import { BottomActiveButtons } from "../../common/BottomActiveButtons";
import { ScheduleResult } from "@/shared/types";
import { useGetApplicationDetail } from "../../../hooks/useGetApplicationDetail";
import { useUpdateDocumentStage } from "../../../hooks/useUpdateDocumentStage";
import { ApplicationMethod, SubmissionStatus } from "../../../types";

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
      // 서버에서 한글로 받은 값을 영어 value로 변환
      const rawMethod = applicationInfo?.applicationMethod ?? '';
      const methodValue = APPLICATION_METHOD_LABEL_TO_VALUE[rawMethod] ?? rawMethod;
      setApplicationMethod(methodValue);
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
          <DateTimeInput value={deadline} onChange={setDeadline} />
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