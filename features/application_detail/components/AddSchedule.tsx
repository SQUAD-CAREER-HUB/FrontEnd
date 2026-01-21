import { Card, CardContent, CardFooter } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { DatePickerInput } from "./DatePickerInput";
import StatusButtonGroup from "./StatusButtonGroup";
import FormLabel from "./common/FormLabel";
import { BottomActiveButtons } from "./BottomActiveButtons";
import { useState } from "react";
import { useParams } from "next/navigation";
import { ScheduleResult } from "@/shared/types";
import { useCreateInterviewSchedule } from "../hooks/useCreateInterviewSchedule";
import { useCreateEtcSchedule } from "../hooks/useCreateEtcSchedule";

interface AddScheduleProps {
  type: 'interview' | 'other';
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddSchedule({ type, setOpen }: AddScheduleProps) {
  const params = useParams();
  const applicationId = Number(params.id);

  const [scheduleName, setScheduleName] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [location, setLocation] = useState('');
  const [scheduleResult, setScheduleResult] = useState<ScheduleResult>('WAITING');

  const createInterview = useCreateInterviewSchedule(applicationId);
  const createEtc = useCreateEtcSchedule(applicationId);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (!scheduleName || !startDate) return;

    const startedAt = startDate.toISOString().slice(0, 19);

    if (type === 'interview') {
      createInterview.mutate(
        {
          scheduleName,
          startedAt,
          location,
          result: scheduleResult,
        },
        {
          onSuccess: () => setOpen(false),
        }
      );
    } else {
      const endedAt = endDate ? endDate.toISOString().slice(0, 19) : startedAt;
      createEtc.mutate(
        {
          scheduleName,
          startedAt,
          endedAt,
          scheduleResult,
        },
        {
          onSuccess: () => setOpen(false),
        }
      );
    }
  };

  const isPending = createInterview.isPending || createEtc.isPending;

  return (
    <Card className="transition-all ring-2 ring-brand-50">
      <CardContent className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <FormLabel htmlFor="name">전형 이름</FormLabel>
            <Input
              id="name"
              type="text"
              placeholder={type === 'interview' ? "예: 1차 면접" : "예: 코딩테스트"}
              value={scheduleName}
              onChange={(e) => setScheduleName(e.target.value)}
              required
              className="w-full text-sm font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <DatePickerInput
            label="시작 일시"
            value={startDate}
            onChange={(date) => setStartDate(date)}
            id="startDate"
          />
          {type === 'interview' ? (
            <div className="flex flex-col">
              <FormLabel htmlFor="location">장소</FormLabel>
              <Input
                id="location"
                type="text"
                placeholder="예: 강남구 OO빌딩 3층"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-sm font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2"
              />
            </div>
          ) : (
            <DatePickerInput
              label="종료 일시"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              id="endDate"
            />
          )}
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
          onCancel={handleCancel}
          onSave={handleSave}
          loading={isPending}
        />
      </CardFooter>
    </Card>
  );
}