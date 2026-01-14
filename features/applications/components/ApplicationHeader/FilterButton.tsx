'use client';

import { Funnel } from 'lucide-react';
import { useApplicationFilterPanelStore } from '../../stores/useApplicationFilterPanelStore';

const FilterButton = () => {
  const open = useApplicationFilterPanelStore((state) => state.open);

  return (
    <div
      onClick={() => open()}
      className='lg:hidden cursor-pointer p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-brand-500 rounded-xl transition-all shadow-sm'
    >
      <Funnel className='w-5 h-5' />
    </div>
  );
};

export default FilterButton;