import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Pen } from "lucide-react";
import { StatusButton } from "../StatusButton";
import { useTimelineStore } from "../../stores/useTimeLineStore";
import { useShallow } from "zustand/shallow";

interface ViewCardProps {
  id:number;
  title: string;
  datetime: string;
  scheduleResult: 'WAITING' | 'PASS' | 'FAILED';
  type: 'interview' | 'other';
}

export default function ViewCard({
  id,
  title,
  datetime,
  scheduleResult,
  type,
}: ViewCardProps) {
  const activeBg = {
    WAITING: 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800',
    PASS: 'bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800',
    FAILED: 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800 ',
  };

  const activeFont = {
    WAITING: 'text-slate-900 dark:text-slate-100',
    PASS: 'text-green-800 dark:text-green-400',
    FAILED: 'text-red-800 dark:text-red-400',
  };
  const { setEditingInterviewStageId, setEditingEtcStageId } = useTimelineStore(useShallow(state => ({
      setEditingInterviewStageId: state.setEditingInterviewStageId,
      setEditingEtcStageId: state.setEditingEtcStageId,
    })));
    const closeCard = () => {
      if(type ==='interview') {
        setEditingInterviewStageId(id);
      } else {
        setEditingEtcStageId(id);
      }
    }
  return (
    <Card
      className={`p-4 rounded-xl border group relative transition-all
        ${activeBg[scheduleResult]}
      `}
    >
      <CardContent className="px-0">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0 pr-4">
            <h4 className={`font-bold ${activeFont[scheduleResult]}`}>
              {title}
            </h4>
            <div className="text-[11px] text-slate-500 mt-1.5">
              <Clock className="w-3 h-3 inline mr-1" />
              시작: {datetime}
            </div>
          </div>

          <Button
            onClick={() => {closeCard();}}
            variant="ghost"
            className="p-1.5 text-slate-300 hover:text-brand-500"
          >
            <Pen className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>

      <div className="px-0 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex flex-col items-start gap-1">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
          전형 결과
        </span>
        <StatusButton
          status={scheduleResult}
          currentStatus={scheduleResult}
        />
      </div>
    </Card>
  );
}
