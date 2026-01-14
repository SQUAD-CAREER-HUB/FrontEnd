'use client';

import { Sheet, SheetContent, SheetTitle } from '@/shared/components/ui/sheet';
import { useApplicationFilterPanelStore } from '../stores/useApplicationFilterPanelStore';
import ApplicationFilterPanelContent from './ApplicationFilterPanelContent';
import { FunnelIcon } from 'lucide-react';

export default function ApplicationFilterPanelMobile() {
  const { isOpen, close } = useApplicationFilterPanelStore();

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent side='right' className='w-full sm:w-[360px] flex flex-col'>
        <SheetTitle className='p-4 border-b'>
          <span className='font-bold text-slate-900 dark:text-slate-100 flex gap-2 items-center'>
            <FunnelIcon className='w-4 h-4 text-primary' />
            검색 및 필터
          </span>
        </SheetTitle>
        <div className='overflow-y-auto flex-1'>
          <ApplicationFilterPanelContent />
        </div>
      </SheetContent>
    </Sheet>
  );
}
