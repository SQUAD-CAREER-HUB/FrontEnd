'use client'
import EditCard from "./EditCard";
import ViewCard from "./ViewCard";
import StageWrapper from "../common/StageWrapper";
import StageEditButton from "../common/StageEditButton";
import { useStageEdit } from "../../hooks/useStageEdit";

export interface FinalResultStageProps {
  result?: 'passed' | 'rejected';
  onPass?: () => void;
  onFail?: () => void;
}

export default function FinalResultStage() {
  const { isEditing, toggleEdit } = useStageEdit(false);

  return (
    <StageWrapper number={4} stage='result'>
      <div className='rounded-xl p-5 shadow-sm transition-all border bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800'>
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">최종 결과</h3>
          <StageEditButton onClick={toggleEdit} />
        </div>
        <div className='pt-3 border-t border-slate-100 dark:border-slate-800'>
          {isEditing ? (
            <EditCard />
          ) : (
            <ViewCard />
          )}
        </div>
      </div>
    </StageWrapper>
  );
}
