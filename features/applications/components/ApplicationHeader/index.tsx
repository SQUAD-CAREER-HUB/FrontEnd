import FilterButton from "./FilterButton";

const ApplicationHeader = () => {
  return (
    <div className="flex justify-between items-center px-4 py-4 md:px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 z-10 flex-shrink-0">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100">
          내 지원 현황
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          지원한 기업들의 진행 상황을 확인하세요.
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <FilterButton />
      </div>
    </div>
  );
};

export default ApplicationHeader;
