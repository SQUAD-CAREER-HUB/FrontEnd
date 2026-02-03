'use client';

import { FunnelIcon, X, PanelRightClose } from 'lucide-react';
import ApplicationFilterPanelContent from './ApplicationFilterPanelContent';
import { useApplicationFilterPanelStore } from '../stores/useApplicationFilterPanelStore';

// 데스크탑 (lg 이상)용 static 필터 패널
export default function ApplicationFilterPanel() {
  const { isOpen, close } = useApplicationFilterPanelStore();

  return (
    <div
      className={`fixed inset-y-0 right-0 z-40 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 transform transition-all duration-300 lg:static lg:block shadow-2xl lg:shadow-none ${
        isOpen
          ? 'translate-x-0 w-80'
          : 'translate-x-full w-0 lg:w-0 overflow-hidden'
      }`}
      aria-hidden={!isOpen}
      inert={!isOpen ? true : undefined}
    >
      <div className='flex flex-col h-full w-80 sticky top-0'>
        <div className='p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50'>
          <h3 className='font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2'>
            <FunnelIcon className='w-4 h-4 text-brand-500' />
            필터
          </h3>
          <button
            onClick={close}
            className='p-1 text-slate-400 hover:text-slate-600 lg:hidden'
          >
            <X className='w-5 h-5' />
          </button>
          <button
            onClick={close}
            className='p-1 text-slate-400 hover:text-slate-600 hidden lg:block'
            title='패널 접기'
          >
            <PanelRightClose className='w-5 h-5' />
          </button>
        </div>

        <div className='flex-1 overflow-y-auto p-4 space-y-6 h-[calc(100vh-100px)] custom-scrollbar'>
          <ApplicationFilterPanelContent />
        </div>
      </div>
    </div>
  );
}
