import { Card, CardContent } from "@/shared/components/ui/card";
import { Clock } from "lucide-react";
import { StatusButton } from "../StatusButton";
import StageEditButton from "../common/StageEditButton";
import { useStageEditor } from "../../hooks/useStageEditor";
import { STATUS_BG_STYLES, STATUS_FONT_STYLES, LABEL_STYLES } from "../../constants/styles";

interface ViewCardProps {
  id: number;
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
  const { setEditingStageId } = useStageEditor(id, type);

  const handleEdit = () => {
    setEditingStageId(id);
  };

  return (
    <Card className={`p-4 rounded-xl border group relative transition-all ${STATUS_BG_STYLES[scheduleResult]}`}>
      <CardContent className="px-0">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0 pr-4">
            <h4 className={`font-bold ${STATUS_FONT_STYLES[scheduleResult]}`}>
              {title}
            </h4>
            <div className="text-[11px] text-slate-500 mt-1.5">
              <Clock className="w-3 h-3 inline mr-1" />
              시작: {datetime}
            </div>
          </div>
          <StageEditButton onClick={handleEdit} />
        </div>
      </CardContent>

      <div className="px-0 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex flex-col items-start gap-1">
        <span className={`${LABEL_STYLES.baseBlack} tracking-widest`}>
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
