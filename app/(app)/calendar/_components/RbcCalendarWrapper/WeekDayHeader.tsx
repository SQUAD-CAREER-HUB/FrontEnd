import { DateLocalizer } from 'react-big-calendar';

interface WeekDayHeaderProps {
  date: Date;
  localizer: DateLocalizer;
}

export function WeekDayHeader({ date, localizer }: WeekDayHeaderProps) {
  const day = localizer.format(date, 'd');
  const weekday = localizer.format(date, 'EEE');

  return (
    <div className='flex flex-col gap-1 items-center'>
      {/* 요일 */}
      <span className='text-xs text-slate-500'>{weekday}</span>
      {/* 날짜 */}
      <span className='text-base font-semibold'>{day}</span>
    </div>
  );
}
