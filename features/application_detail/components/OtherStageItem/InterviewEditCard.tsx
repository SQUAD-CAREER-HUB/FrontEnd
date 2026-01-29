import { Card, CardContent, CardFooter } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { DateTimeInput } from "@/shared/components/DateTimeInput";
import StatusButtonGroup from "../StatusButtonGroup";
import FormLabel from "../common/FormLabel";
import { BottomActiveButtons } from "../BottomActiveButtons";
import { useStageEditor } from "../../hooks/useStageEditor";
import { useState } from "react";
import { useParams } from "next/navigation";
import { ScheduleResult } from "@/shared/types";
import { useUpdateInterviewSchedule } from "../../hooks/useUpdateInterviewSchedule";

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

  const updateInterview = useUpdateInterviewSchedule(applicationId);

  const handleClose = () => {
    setEditingStageId(null);
  };

  const handleSave = () => {
    if (!scheduleName || !startDate) return;

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
              onChange={(e) => setScheduleName(e.target.value)}
              required
              className="w-full text-sm font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <DateTimeInput label="시작 일시" value={startDate} onChange={setStartDate} id="startDate" />
          <div className="flex flex-col gap-1">
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
