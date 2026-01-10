interface ApplicationHeaderProps {
  totalCount: number;
}

const ApplicationHeader = ({ totalCount }: ApplicationHeaderProps) => {
  return (
    <div className="flex justify-between items-center px-4 py-4 md:px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-10 flex-shrink-0">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100">
          내 지원 현황
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          총 {totalCount}개의 기업에 지원했습니다.
        </p>
      </div>
      <div className="flex items-center space-x-2"></div>
    </div>
  );
};

export default ApplicationHeader;
