import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePickerInput } from "../DatePickerInput";
import StatusButtonGroup from "../StatusButtonGroup";
import { Button } from "@/components/ui/button";
import { RotateCcw, Save } from "lucide-react";
import { useTimelineStore } from "../../stores/useTimeLineStore";
import { useShallow } from "zustand/shallow";

export default function EditCard({type} : {type: 'interview' | 'other'}) {
  const { setEditingInterviewStageId, setEditingEtcStageId } = useTimelineStore(useShallow(state => ({
    setEditingInterviewStageId: state.setEditingInterviewStageId,
    setEditingEtcStageId: state.setEditingEtcStageId,
  })));
  const closeCard = () => {
    if(type ==='interview') {
      setEditingInterviewStageId(null);
    } else {
      setEditingEtcStageId(null);
    }
  }
  return (
    <Card className="transition-all ring-2 ring-brand-50">
      <CardContent className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <Label htmlFor="email" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1 block">전형 이름</Label>
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
            <Label htmlFor="status" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 block">진행 상태</Label>
            <StatusButtonGroup status={"WAITING"} onStatusChange={() => { }} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-2 self-end">
        <Button
          onClick={() =>{
            closeCard();
          }}
          variant={"ghost"}
          className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 flex items-center gap-1.5"
        >
          <RotateCcw className="w-3 h-3" />
          <span>취소</span>
        </Button>
        <Button
          onClick={() =>{closeCard()}}
          className="px-5 py-1.5 bg-brand-500 text-white rounded-lg text-xs font-bold shadow-md flex items-center gap-1.5"
        >
          <Save className="w-3 h-3" />
          <span>저장</span>
        </Button>
      </CardFooter>
    </Card >)
}