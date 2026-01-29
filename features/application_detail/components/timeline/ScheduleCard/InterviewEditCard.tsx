import { Card, CardContent, CardFooter } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { DateTimeInput } from "@/shared/components/DateTimeInput";
import StatusButtonGroup from "../../common/StatusButtonGroup";
import FormLabel from "../../common/FormLabel";
import { BottomActiveButtons } from "../../common/BottomActiveButtons";
import { useStageEditor } from "../../../hooks/useStageEditor";
import { useState } from "react";
import { useParams } from "next/navigation";
import { ScheduleResult } from "@/shared/types";
import { useUpdateInterviewSchedule } from "../../../hooks/useUpdateInterviewSchedule";
import { validateInterviewSchedule } from "../../../schemas/schedule";

interface InterviewEditCardProps {
  id: number;
  initialData: {
    scheduleName: string;
    startedAt: string;
    location?: string;
    scheduleResult: ScheduleResult;
  };
}

export default function InterviewEditCard({ id, initialData }: InterviewEditCardProps) {
  const params = useParams();
  const applicationId = Number(params.id);
  const { setEditingStageId } = useStageEditor(null, 'interview');

  const [scheduleName, setScheduleName] = useState(initialData.scheduleName);
  const [startDate, setStartDate] = useState(initialData.startedAt ?? '');
  const [location, setLocation] = useState(initialData.location ?? '');
  const [scheduleResult, setScheduleResult] = useState<ScheduleResult>(initialData.scheduleResult);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateInterview = useUpdateInterviewSchedule(applicationId);

  const handleClose = () => {
    setEditingStageId(null);
  };

  const handleSave = () => {
    const result = validateInterviewSchedule({ scheduleName, startedAt: startDate, location });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    updateInterview.mutate(
      {
        scheduleId: id,
        data: {
          scheduleName,
          startedAt: startDate,
          location,
          result: scheduleResult,
        },
      },
      { onSuccess: () => handleClose() }
    );
  };

  return (
    <Card className="transition-all ring-2 ring-brand-50">
      <CardContent className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <FormLabel htmlFor="name">전형 이름</FormLabel>
            <Input
              id="name"
              type="text"
              placeholder="예: 1차 면접"
              value={scheduleName}
              onChange={(e) => { setScheduleName(e.target.value); if (errors.scheduleName) setErrors((prev) => ({ ...prev, scheduleName: '' })); }}
              className="w-full text-sm font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2"
            />
            {errors.scheduleName && <p className="text-xs text-red-500 mt-1">{errors.scheduleName}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <DateTimeInput
              label="시작 일시"
              value={startDate}
              onChange={(v) => { setStartDate(v); if (errors.startedAt) setErrors((prev) => ({ ...prev, startedAt: '' })); }}
              id="startDate"
              className="w-full text-xs border border-slate-200 dark:border-slate-700 rounded-lg p-2 dark:bg-slate-900"
              showIcon={false}
            />
            {errors.startedAt && <p className="text-xs text-red-500 mt-1">{errors.startedAt}</p>}
          </div>
          <div className="flex flex-col">
            <FormLabel htmlFor="location" className="">장소 및 링크</FormLabel>
            <Input
              id="location"
              type="text"
              placeholder="장소/링크"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-col gap-1">
            <FormLabel htmlFor="status">진행 상태</FormLabel>
            <StatusButtonGroup status={scheduleResult} onStatusChange={setScheduleResult} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-2 self-end">
        <BottomActiveButtons onCancel={handleClose} onSave={handleSave} loading={updateInterview.isPending} />
      </CardFooter>
    </Card>
  );
}
