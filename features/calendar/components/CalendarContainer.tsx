'use client';

import { startOfMonth, endOfMonth, format } from 'date-fns';
import RbcCalendarWrapper from './RbcCalendarWrapper';
import { useGetSchedules } from '../hooks/useGetSchedules';
import { useCalendarViewStore } from '../stores/useCalendarViewStore';

/**
 * 캘린더의 비즈니스 로직(데이터 페칭, 날짜 상태 관리)을 담당하는 컨테이너
 */
export default function CalendarContainer() {
  const { date } = useCalendarViewStore();

  const from = format(startOfMonth(date), 'yyyy-MM-dd');
  const to = format(endOfMonth(date), 'yyyy-MM-dd');

  const { data, isLoading, isError } = useGetSchedules(from, to);

  return (
    <div className='h-full w-full relative'>
      <RbcCalendarWrapper events={data?.items || []} />

      {isLoading && (
        <div className='absolute inset-0 bg-white/50 dark:bg-slate-950/50 z-10 flex items-center justify-center'>
          {/* 여기에 스켈레톤이나 스피너 배치 */}
        </div>
      )}
    </div>
  );
}
