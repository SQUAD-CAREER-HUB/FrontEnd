'use client';

import { BriefcaseIcon, ChevronRightIcon } from 'lucide-react';
import { ApplicationCard } from './ApplicationCard';
import { useGetRecentApplications } from '../hooks/useGetRecentApplications';
import { Button } from '@/shared/components/ui/button';

export function RecentApplications() {
  const { data } = useGetRecentApplications();

  return (
    <div className='space-y-4 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-border'>
      {/* 타이틀 및 더보기 버튼 */}
      <div className='flex items-center justify-between'>
        <div className='text-xl font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-x-2'>
          <BriefcaseIcon className='stroke-2 w-5 h-5 text-brand-500' />
          <span>진행 중인 서류 전형</span>
        </div>
        <Button
          variant='link'
          size='lg'
          className='text-sm font-bold text-brand-500 hover:text-brand-600 flex items-center transition-colors'
        >
          더보기 <ChevronRightIcon className='w-4 h-4 stroke-2' />
        </Button>
      </div>

      {/* 그리드 리스트 */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {data?.map((application) => (
          <ApplicationCard key={application.applicationId} {...application} />
        ))}
      </div>
    </div>
  );
}
