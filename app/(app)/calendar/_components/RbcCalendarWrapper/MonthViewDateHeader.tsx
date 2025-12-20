import { DateHeaderProps } from 'react-big-calendar';
import { cn } from '@/lib/utils';

export function MonthViewDateHeader({
  label,
  date,
  isOffRange,
}: DateHeaderProps) {
  // 오늘 날짜 확인
  const isToday = new Date().toDateString() === date.toDateString();

  // const isWeekend = value.getDay() === 0 || value.getDay() === 6;

  return (
    <div className='flex items-center justify-between w-full px-0.5 md:px-2 py-1 group'>
      {/* 1. 날짜 숫자 (왼쪽 배치) */}
      <div
        className={cn(
          'flex items-center justify-center w-7 h-7 font-black text-sm transition-colors rounded-full cursor-pointer',
          isToday
            ? 'bg-primary text-primary-foreground shadow-primary' // 오늘 날짜 강조
            : ''
        )}
      >
        {label}
      </div>
    </div>
  );
}
