'use client';

import { FunnelIcon } from 'lucide-react';
import ApplicationFilterPanelContent from './ApplicationFilterPanelContent';

// 데스크탑 (lg 이상)용 static 필터 패널
export default function ApplicationFilterPanel() {
  return (
    <div className='w-80 h-full bg-slate-50 border-l border-border flex flex-col'>
      <div className='flex items-center p-4 border-b h-[68px]'>
        <div className='flex gap-2 items-center'>
          <FunnelIcon className='w-4 h-4 text-primary stroke-3' />
          <span className='font-black text-slate-900 dark:text-slate-100'>
            검색 및 필터
          </span>
        </div>
      </div>

      <div className='flex-1 overflow-y-auto'>
        <ApplicationFilterPanelContent />
      </div>
    </div>
  );
}
