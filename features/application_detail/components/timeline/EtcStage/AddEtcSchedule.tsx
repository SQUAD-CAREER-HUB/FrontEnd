import { Card, CardContent, CardFooter } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { DateTimeInput } from "@/shared/components/DateTimeInput";
import StatusButtonGroup from "../../common/StatusButtonGroup";
import FormLabel from "../../common/FormLabel";
import { BottomActiveButtons } from "../../common/BottomActiveButtons";
import { useState } from "react";
import { useParams } from "next/navigation";
import { ScheduleResult } from "@/shared/types";
import { useCreateEtcSchedule } from "../../../hooks/useCreateEtcSchedule";
import { validateEtcSchedule } from "../../../schemas/schedule";

interface AddEtcScheduleProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddEtcSchedule({ setOpen }: AddEtcScheduleProps) {
  const params = useParams();
  const applicationId = Number(params.id);

  const [scheduleName, setScheduleName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [scheduleResult, setScheduleResult] = useState<ScheduleResult>('WAITING');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const createEtc = useCreateEtcSchedule(applicationId);

  const handleSave = () => {
    const result = validateEtcSchedule({ scheduleName, startedAt: startDate, endedAt: endDate });
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

    createEtc.mutate(
      {
        scheduleName,
        startedAt: startDate,
        endedAt: endDate || startDate,
        scheduleResult,
      },
      { onSuccess: () => setOpen(false) }
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
              placeholder="예: 코딩테스트"
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
              onChange={(v) => { setStartDate(v); if (!endDate) setEndDate(v); if (errors.startedAt) setErrors((prev) => ({ ...prev, startedAt: '' })); }}
              id="startDate"
            />
            {errors.startedAt && <p className="text-xs text-red-500 mt-1">{errors.startedAt}</p>}
          </div>
          <div>
            <DateTimeInput
              label="종료 일시"
              value={endDate}
              onChange={(v) => { setEndDate(v); if (errors.endedAt) setErrors((prev) => ({ ...prev, endedAt: '' })); }}
              id="endDate"
            />
            {errors.endedAt && <p className="text-xs text-red-500 mt-1">{errors.endedAt}</p>}
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
        <BottomActiveButtons
          onCancel={() => setOpen(false)}
          onSave={handleSave}
          loading={createEtc.isPending}
        />
      </CardFooter>
    </Card>
  );
}
