'use client';

import { differenceInCalendarDays, format, parseISO } from 'date-fns';

import { cn } from '@/shared/lib/utils';

interface UpcomingScheduleItemProps {
  schedule: {
    startedAt: string;
    stageType: string;
    companyName: string;
    scheduleName: string;
  };
  onClick?: () => void;
}

export const UpcomingScheduleItem = ({
  schedule,
  onClick,
}: UpcomingScheduleItemProps) => {
  const startDate = parseISO(schedule.startedAt);
  const today = new Date();
  const dDay = differenceInCalendarDays(startDate, today);

  const timeString = format(startDate, 'aaa hh:mm');

  const isInterview = schedule.stageType === 'INTERVIEW';
  const badgeStyles = isInterview
    ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30'
    : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30';

  // 디데이 긴급도 스타일 (D-3 이내일 때 빨간색)
  const isUrgent = dDay <= 3;
  const dDayStyles = isUrgent
    ? 'text-red-500 border-red-100 dark:border-red-900'
    : 'text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600';

  return (
    <div
      onClick={onClick}
      className='flex items-center space-x-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl cursor-pointer hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:ring-2 hover:ring-brand-100 dark:hover:ring-brand-900 transition-all group border border-transparent'
    >
      {/* D-Day Badge */}
      <div
        className={cn(
          'shrink-0 w-12 h-12 rounded-xl flex flex-col items-center justify-center font-extrabold shadow-sm bg-white dark:bg-slate-700 border',
          dDayStyles
        )}
      >
        <span className='text-[9px] font-bold opacity-80 leading-none mb-1'>
          D-
        </span>
        <span className='text-base leading-none'>
          {dDay === 0 ? 'Day' : dDay}
        </span>
      </div>

      {/* Info Section */}
      <div className='flex-1 min-w-0'>
        <div className='flex items-center justify-between mb-1'>
          <h4 className='font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors text-sm'>
            {schedule.companyName}
          </h4>
          <span
            className={cn(
              'text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap ml-2',
              badgeStyles
            )}
          >
            {isInterview ? '면접' : '기타'}
          </span>
        </div>

        <div className='flex items-center text-xs text-slate-400 dark:text-slate-500'>
          <span className='truncate mr-2 font-medium'>
            {schedule.scheduleName}
          </span>
          <span className='shrink-0 font-bold'>• {timeString}</span>
        </div>
      </div>
    </div>
  );
};
