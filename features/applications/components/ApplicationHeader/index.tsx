import { useApplicationFilterPanelStore } from "../../stores/useApplicationFilterPanelStore";
import FilterButton from "./FilterButton";

interface ApplicationHeaderProps {
  totalCount: number;
}

const ApplicationHeader = ({ totalCount }: ApplicationHeaderProps) => {
  const isOpen = useApplicationFilterPanelStore(state => state.isOpen);
  return (
    <div className="flex justify-between items-center mb-6 flex-shrink-0">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
          지원 관리 현황
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          총 {totalCount}개의 기업 지원 정보를 관리 중입니다.
        </p>
      </div>
      <div className="flex items-center space-x-2">
       {!isOpen && <FilterButton />}
      </div>
    </div>
  );
};

export default ApplicationHeader;
