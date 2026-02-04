import StatusButtonGroup from "../../common/StatusButtonGroup";
import { BottomActiveButtons } from "../../common/BottomActiveButtons";
import { useMemo, useState } from "react";
import { ScheduleResult } from "@/shared/types";
import FormLabel from "../../common/FormLabel";
import { useParams } from "next/navigation";
import { useGetApplicationDetail } from "../../../hooks/useGetApplicationDetail";
import { useUpdateFinalResult } from "../../../hooks/useUpdateFinalResult";
import { ApplicationStatus } from "../../../types";
import { hasAnyFailInTimeline } from "../../../lib/timelineSync";

// ScheduleResult -> ApplicationStatus 매핑
const RESULT_TO_APPLICATION_STATUS: Record<ScheduleResult, ApplicationStatus> = {
  WAITING: 'IN_PROGRESS',
  PASS: 'FINAL_PASS',
  FAIL: 'FINAL_FAIL',
};

// ApplicationStatus -> ScheduleResult 매핑
const APPLICATION_STATUS_TO_RESULT: Record<ApplicationStatus, ScheduleResult> = {
  IN_PROGRESS: 'WAITING',
  FINAL_PASS: 'PASS',
  FINAL_FAIL: 'FAIL',
};

interface EditCardProps {
  onClose?: () => void;
}

export default function EditCard({ onClose }: EditCardProps) {
  const params = useParams();
  const applicationId = Number(params.id);
  const { data } = useGetApplicationDetail(applicationId);
  const { mutate: updateFinalResult, isPending } = useUpdateFinalResult(applicationId);

  const currentApplicationStatus = data?.applicationInfo.applicationStatus ?? 'IN_PROGRESS';
  const [status, setStatus] = useState<ScheduleResult>(
    APPLICATION_STATUS_TO_RESULT[currentApplicationStatus]
  );

  // 전형 중 불합격이 있으면 대기(IN_PROGRESS) 선택 불가
  const hasFail = useMemo(() => (data ? hasAnyFailInTimeline(data) : false), [data]);
  const disabledStatuses: ScheduleResult[] = hasFail ? ['WAITING'] : [];

  const handleSave = () => {
    const applicationStatus = RESULT_TO_APPLICATION_STATUS[status];
    updateFinalResult(applicationStatus, {
      onSuccess: () => onClose?.(),
    });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
      <div className="flex flex-col gap-1">
        <FormLabel className="ml-1">최종 상태</FormLabel>
        <StatusButtonGroup status={status} onStatusChange={setStatus} disabledStatuses={disabledStatuses} />
        {hasFail && (
          <p className="text-[10px] text-red-400 mt-1">
            불합격 전형이 있어 대기로 변경할 수 없습니다
          </p>
        )}
      </div>
      <div className="flex items-center gap-2 self-end">
        <BottomActiveButtons onCancel={onClose} onSave={handleSave} loading={isPending} />
      </div>
    </div>
  );
}