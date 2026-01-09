import { HeaderProps } from 'react-big-calendar';
import { cn } from '@/shared/lib/utils';

export function MonthViewHeader({ date, label, localizer }: HeaderProps) {
  const dayOfWeek = date.getDay();
  const isSunday = dayOfWeek === 0;
  const isSaturday = dayOfWeek === 6;

  return (
    <div className='py-3 flex items-center justify-center text-xs md:text-base font-black text-slate-500 bg-slate-50'>
      <span
        className={cn(
          'text-sm font-semibold tracking-wider',
          isSunday && 'text-red-500', // 일요일은 빨간색
          isSaturday && 'text-blue-500', // 토요일은 파란색
          !isSunday && !isSaturday && 'text-slate-600' // 평일은 회색
        )}
      >
        {label}
      </span>
    </div>
  );
}
