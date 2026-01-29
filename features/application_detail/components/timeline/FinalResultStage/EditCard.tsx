import StatusButtonGroup from "../../common/StatusButtonGroup";
import { BottomActiveButtons } from "../../common/BottomActiveButtons";
import { useState } from "react";
import { ScheduleResult } from "@/shared/types";
import FormLabel from "../../common/FormLabel";
import { useParams } from "next/navigation";
import { useGetApplicationDetail } from "../../../hooks/useGetApplicationDetail";
import { useUpdateFinalResult } from "../../../hooks/useUpdateFinalResult";
import { ApplicationStatus } from "../../../types";

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
        <StatusButtonGroup status={status} onStatusChange={setStatus} />
      </div>
      <div className="flex items-center gap-2 self-end">
        <BottomActiveButtons onCancel={onClose} onSave={handleSave} loading={isPending} />
      </div>
    </div>
  );
}