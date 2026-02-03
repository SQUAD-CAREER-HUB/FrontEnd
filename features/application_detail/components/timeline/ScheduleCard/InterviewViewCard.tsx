import { Clock, MapPin, Pen, Trash2 } from "lucide-react";
import { StatusButton } from "../../common/StatusButton";
import { useStageEditor } from "../../../hooks/useStageEditor";
import { LABEL_STYLES } from "../../../constants/styles";
import { formatDateTime } from "@/shared/lib/utils";
import { useDeleteSchedule } from "../../../hooks/useDeleteSchedule";

interface InterviewViewCardProps {
  id: number;
  title: string;
  datetime: string;
  location?: string;
  scheduleResult: 'WAITING' | 'PASS' | 'FAIL';
}

export default function InterviewViewCard({
  id,
  title,
  datetime,
  location,
  scheduleResult,
}: InterviewViewCardProps) {
  const { setEditingStageId } = useStageEditor(id, 'interview');
  const { mutate: deleteSchedule } = useDeleteSchedule('interview');

  const handleEdit = () => {
    setEditingStageId(id);
  };

  const handleDelete = () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteSchedule(id);
    }
  };

  return (
    <div className="p-4 rounded-xl border group relative transition-all bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0 pr-4">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
              {title}
            </h4>
            <div className="text-[11px] text-slate-500 mt-1.5 flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-slate-400" />
                {formatDateTime(datetime)}
              </div>
              {location && (
                <div className="flex items-center gap-1.5">
                  <div className="flex-shrink-0">
                    <MapPin className="w-3 h-3 text-slate-400" />
                  </div>
                  <span className="truncate">{location}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1 md:opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleEdit}
              className="p-1.5 text-slate-300 hover:text-brand-500 transition-colors"
              title="수정"
            >
              <Pen className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 text-slate-300 hover:text-red-500 transition-colors"
              title="삭제"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex flex-col items-start gap-1">
          <span className={`${LABEL_STYLES.baseBlack} tracking-widest`}>
            전형 결과
          </span>
          <StatusButton
            status={scheduleResult}
            currentStatus={scheduleResult}
          />
        </div>
      </div>
    </div>
  );
}
