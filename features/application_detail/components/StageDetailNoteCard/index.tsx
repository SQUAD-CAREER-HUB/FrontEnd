import ViewCard from "./ViewCard";
import EditCard from "./EditCard";
import { Card, CardHeader } from "@/shared/components/ui/card";
import { CirclePlay, Save } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import StageEditButton from "../common/StageEditButton";
import { useStageEdit } from "../../hooks/useStageEdit";

export default function StageDetailNoteCard() {
  const { isEditing, toggleEdit } = useStageEdit(false);

  return (
    <Card className='p-0 bg-white gap-0 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col transition-all'>
      <CardHeader className='p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex justify-between items-center flex-shrink-0 relative'>
        <h2 className='text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center'>
          <CirclePlay className='w-5 h-5 text-brand-500 mr-2' />
          상세 정보 및 메모
        </h2>
        {isEditing ? (
          <StageEditButton onClick={toggleEdit} />
        ) : (
          <div className="flex gap-2">
            <Button
              onClick={toggleEdit}
              variant="ghost"
              className="text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              취소
            </Button>
            <Button
              onClick={toggleEdit}
              variant="ghost"
              className="text-xs font-bold text-brand-600 flex items-center gap-1"
            >
              <Save className="w-3 h-3" />저장
            </Button>
          </div>
        )}
      </CardHeader>
      {isEditing ? (
        <ViewCard />
      ) : (
        <EditCard />
      )}
    </Card>
  );
}