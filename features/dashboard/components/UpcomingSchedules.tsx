'use client';

import { CalendarIcon, ChevronRightIcon } from 'lucide-react';
import { useGetUpcomingSchedules } from '../hooks/useGetUpcomingSchedules';
import { Button } from '@/shared/components/ui/button';
import { ScheduleItem } from './ScheduleItem';

/**
 * D-Day 배지와 다가오는 D-7 일정 리스트를 담당합니다.
 * @param param0
 * @returns
 */
export const UpcomingSchedules = () => {
  const { data } = useGetUpcomingSchedules();

  const handleClickMoreShowButton = () => {};

  const handleItemClick = (id: number) => {
    // 상세 페이지 이동 등
  };

  return (
    <div className='bg-white dark:bg-slate-900 p-8 rounded-3xl border border-border'>
      <div className='flex items-center justify-between mb-6'>
        <div className='text-xl font-extrabold flex items-center gap-2'>
          <CalendarIcon className='stroke-2 w-5 h-5 text-brand-500' />
          다가오는 면접/기타 일정
        </div>
        <Button
          variant='link'
          size='lg'
          className='text-sm font-bold text-brand-500 hover:text-brand-600 flex items-center transition-colors'
          onClick={handleClickMoreShowButton}
        >
          더보기 <ChevronRightIcon className='w-4 h-4 stroke-2' />
        </Button>
      </div>

      {/* 리스트 섹션 */}
      <div className='space-y-1'>
        {data?.interviews.length ? (
          data.interviews.map((interview) => (
            <ScheduleItem
              key={interview.id}
              interview={interview}
              onClick={() => handleItemClick(interview.id)}
            />
          ))
        ) : (
          <p className='text-center py-10 text-slate-400 text-sm'>
            다가오는 일정이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};
