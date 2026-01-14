'use client';

import { Funnel, PanelRight, PanelRightClose } from 'lucide-react';
import { useApplicationFilterPanelStore } from '../../stores/useApplicationFilterPanelStore';
import { useShallow } from 'zustand/shallow';

const FilterButton = () => {
  const {toggle, isOpen} = useApplicationFilterPanelStore(useShallow((state) => ({toggle: state.toggle, isOpen: state.isOpen})));

  return (
    <div
      onClick={() => toggle()}
      className='cursor-pointer p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-brand-500 rounded-xl transition-all shadow-sm'
    >
      <Funnel className='w-5 h-5 lg:hidden' />
      {
        isOpen ?(<PanelRightClose className='w-5 h-5 hidden lg:block'/>): (<PanelRight className='w-5 h-5 hidden lg:block'/>)}
    </div>
  );
};

export default FilterButton;