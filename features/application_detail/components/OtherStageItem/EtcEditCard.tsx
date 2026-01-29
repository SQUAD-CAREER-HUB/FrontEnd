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
import { useUpdateEtcSchedule } from "../../hooks/useUpdateEtcSchedule";

interface EtcEditCardProps {
  id: number;
  initialData: {
    scheduleName: string;
    startedAt: string;
    endedAt?: string;
    scheduleResult: ScheduleResult;
  };
}

export default function EtcEditCard({ id, initialData }: EtcEditCardProps) {
  const params = useParams();
  const applicationId = Number(params.id);
  const { setEditingStageId } = useStageEditor(null, 'other');

  const [scheduleName, setScheduleName] = useState(initialData.scheduleName);
  const [startDate, setStartDate] = useState(initialData.startedAt ?? '');
  const [endDate, setEndDate] = useState(initialData.endedAt ?? '');
  const [scheduleResult, setScheduleResult] = useState<ScheduleResult>(initialData.scheduleResult);

  const updateEtc = useUpdateEtcSchedule(applicationId);

  const handleClose = () => {
    setEditingStageId(null);
  };

  const handleSave = () => {
    if (!scheduleName || !startDate) return;

    updateEtc.mutate(
      {
        scheduleId: id,
        data: {
          scheduleName,
          startedAt: startDate,
          endedAt: endDate || startDate,
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
              placeholder="예: 코딩테스트"
              value={scheduleName}
              onChange={(e) => setScheduleName(e.target.value)}
              required
              className="w-full text-sm font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <DateTimeInput label="시작 일시" value={startDate} onChange={setStartDate} id="startDate" />
          <DateTimeInput label="종료 일시" value={endDate} onChange={setEndDate} id="endDate" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-col gap-1">
            <FormLabel htmlFor="status">진행 상태</FormLabel>
            <StatusButtonGroup status={scheduleResult} onStatusChange={setScheduleResult} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-2 self-end">
        <BottomActiveButtons onCancel={handleClose} onSave={handleSave} loading={updateEtc.isPending} />
      </CardFooter>
    </Card>
  );
}
