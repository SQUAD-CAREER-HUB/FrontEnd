import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DatePickerInput } from "../DatePickerInput";
import StatusButtonGroup from "../StatusButtonGroup";
import FormLabel from "../common/FormLabel";
import { BottomActiveButtons } from "../BottomActiveButtons";
import { useStageEditor } from "../../hooks/useStageEditor";

export default function EditCard({ type }: { type: 'interview' | 'other' }) {
  const { setEditingStageId } = useStageEditor(null, type);

  const handleClose = () => {
    setEditingStageId(null);
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
              required
              className="w-full text-sm font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <DatePickerInput label="시작 일시" value="startDate" />
          </div>
          <div className="flex flex-col gap-1">
            <DatePickerInput label="종료 일시" value="endDate" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-col gap-1">
            <FormLabel htmlFor="status">진행 상태</FormLabel>
            <StatusButtonGroup status={"WAITING"} onStatusChange={() => { }} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-2 self-end">
        <BottomActiveButtons onCancel={handleClose} onSave={handleClose} />
      </CardFooter>
    </Card>
  );
}