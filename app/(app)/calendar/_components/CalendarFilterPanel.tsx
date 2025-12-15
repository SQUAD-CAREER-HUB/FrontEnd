'use client';

import { FunnelIcon, PanelRightCloseIcon } from 'lucide-react';
import FilterPanelContent from './FilterPanelContent';
import { useFilterPanelStore } from '../_stores/useFilterPanelStore';

// 데스크탑, 테블릿 (min-width >= 764px)용 필터 패널
export default function CalendarFilterPanel() {
  const close = useFilterPanelStore((state) => state.close);

  return (
    <div className='w-80 bg-slate-50'>
      <div className='flex justify-between p-4 border-b'>
        <div className='flex gap-2 items-center'>
          <FunnelIcon className='w-4 h-4 text-primary' />
          <span className='font-bold text-slate-900 dark:text-slate-100'>
            필터
          </span>
        </div>
        <PanelRightCloseIcon onClick={close} className='w-6 h-6 text-primary' />
      </div>

      <FilterPanelContent />
    </div>
  );
}
