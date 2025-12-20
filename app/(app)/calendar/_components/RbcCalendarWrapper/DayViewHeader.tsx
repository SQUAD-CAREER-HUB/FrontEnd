import { cn } from '@/lib/utils';
import { format, isToday } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function DayViewHeader({ date }: { date: Date }) {
  const today = isToday(date);

  return (
    <div className='flex flex-col items-center py-2 h-[63px]'>
      <span className='text-xs text-slate-500'>
        {format(date, 'EEE', { locale: ko })}
      </span>

      <div
        className={cn(
          today &&
            'flex items-center justify-center bg-primary text-primary-foreground rounded-full w-6 h-6'
        )}
      >
        <span className='text-sm font-bold cursor-pointer'>
          {format(date, 'd', { locale: ko })}
        </span>
      </div>
    </div>
  );
}
