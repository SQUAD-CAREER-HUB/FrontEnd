import { Card, CardContent, CardFooter } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { DatePickerInput } from "./DatePickerInput";
import StatusButtonGroup from "./StatusButtonGroup";
import { Button } from "@/shared/components/ui/button";
import { RotateCcw, Save } from "lucide-react";
import FormLabel from "./common/FormLabel";
import { useState } from "react";

export default function AddSchedule({setOpen}: {setOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

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
          <DatePickerInput
            label="시작 일시"
            value={startDate}
            onChange={(date) => setStartDate(date)}
            id="startDate"
          />
          <DatePickerInput
            label="종료 일시"
            value={endDate}
            onChange={(date) => setEndDate(date)}
            id="endDate"
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-col gap-1">
            <FormLabel htmlFor="status">진행 상태</FormLabel>
            <StatusButtonGroup status={"WAITING"} onStatusChange={() => { }} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-2 self-end">
        <Button
          onClick={() =>{
            setOpen(false);
          }}
          variant={"ghost"}
          className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 flex items-center gap-1.5"
        >
          <RotateCcw className="w-3 h-3" />
          <span>취소</span>
        </Button>
        <Button
          onClick={() =>{}}
          className="px-5 py-1.5 bg-brand-500 text-white rounded-lg text-xs font-bold shadow-md flex items-center gap-1.5"
        >
          <Save className="w-3 h-3" />
          <span>저장</span>
        </Button>
      </CardFooter>
    </Card >)
}