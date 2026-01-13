import { Clock } from 'lucide-react';
import { ApplicationCard as ApplicationCardType } from '../../hooks/useGetApplications';
import { formatDate, getDdayStyle } from '../../libs';

interface DeadlineSectionProps {
  data: ApplicationCardType;
  dDay: number | string | null;
}

const DeadlineSection = ({ data, dDay }: DeadlineSectionProps) => {
  const isDocumentStage = data.currentStageType === '서류 전형';

  if (isDocumentStage && data.docsStage) {
    return (
      <div className="flex items-center text-xs font-bold text-slate-800 dark:text-slate-200">
        <div className="w-5 flex-shrink-0 flex justify-center mr-2">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <div className="flex items-center font-medium min-w-0">
          <span className="text-slate-500 dark:text-slate-400 mr-1.5 flex-shrink-0">마감:</span>
          <span className="text-slate-700 dark:text-slate-200 truncate">
            {formatDate(data.docsStage.deadline)}{' '}
            <span className={`ml-2 flex-shrink-0 ${dDay !== '마감' && getDdayStyle(dDay as number)} text-slate-700 dark:text-slate-200`}>
              {dDay === '마감 종료' ? '마감 종료' : `D-${dDay}`}
            </span>
          </span>
        </div>
      </div>
    );
  }

  if (!isDocumentStage && data.scheduleStage) {
    return (
      <div className="flex items-center text-xs font-bold text-slate-800 dark:text-slate-200">
        <div className="w-5 flex-shrink-0 flex justify-center mr-2">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <div className="flex items-center font-medium min-w-0">
          <span className="text-slate-500 dark:text-slate-400 mr-1.5 flex-shrink-0">다음 일정:</span>
          <span className="text-slate-700 dark:text-slate-200 truncate">
            {formatDate(data.scheduleStage.nextScheduleAt)}
          </span>
        </div>
      </div>
    );
  }

  return null;
};

export default DeadlineSection;
