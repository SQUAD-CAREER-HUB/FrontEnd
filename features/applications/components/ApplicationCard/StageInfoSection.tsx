import { Calendar, Send } from 'lucide-react';
import { ApplicationCard as ApplicationCardType } from '../../hooks/useGetApplications';

interface StageInfoSectionProps {
  data: ApplicationCardType;
}

const StageInfoSection = ({ data }: StageInfoSectionProps) => {
  const isDocumentStage = data.currentStageType === '서류 전형';

  // 서류 전형이 아닐 때: scheduleName 표시
  if (!isDocumentStage) {
    return (
      <div className="flex items-center text-xs font-bold text-slate-800 dark:text-slate-200">
        <div className="w-5 flex justify-center mr-2">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <span className="truncate">
          {data.scheduleStage?.scheduleName || data.currentStageType}
        </span>
      </div>
    );
  }

  // 서류 전형일 때: 방식 표시
  return (
    <>
      {data.docsStage?.applicationMethod && (
        <div className="flex items-center text-xs font-bold text-slate-800 dark:text-slate-200">
          <div className="w-5 flex justify-center mr-2">
            <Send className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="flex items-center font-medium min-w-0">
            <span className="text-slate-500 dark:text-slate-400 mr-1.5">방식:</span>
            <span className="text-slate-700 dark:text-slate-200 truncate">{data.docsStage.applicationMethod}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default StageInfoSection;
