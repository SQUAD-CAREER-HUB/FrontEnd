import { FileText } from 'lucide-react';

const ApplicationEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
        <FileText className="w-8 h-8 text-slate-400 dark:text-slate-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
        지원 내역이 없습니다
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
        새로운 채용 공고에 지원하고 여기서 진행 상황을 확인하세요.
      </p>
    </div>
  );
};

export default ApplicationEmptyState;
