import { ToolbarProps } from 'react-big-calendar';
import { endOfWeek, format, startOfWeek } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Button } from '@/components/ui/button';

export function CustomToolbar({
  date,
  onNavigate,
  onView,
  view,
}: ToolbarProps) {
  const title = getTitle(view, date);

  return (
    <div className='flex items-center justify-between'>
      <div className='flex gap-2 items-center'>
        <Button onClick={() => onNavigate('PREV')}>◀</Button>
        <div className='text-lg font-semibold'>{title}</div>
        <Button onClick={() => onNavigate('NEXT')}>▶</Button>
      </div>

      <div className='flex gap-1'>
        <Button onClick={() => onView('month')}>월</Button>
        <Button onClick={() => onView('week')}>주</Button>
        <Button onClick={() => onView('day')}>일</Button>
        <Button onClick={() => onNavigate('TODAY')}>오늘</Button>
        <Button onClick={() => {}}>+ 일정 추가</Button>
        <Button onClick={() => {}}>필터</Button>
      </div>
    </div>
  );
}

function getTitle(view: string, date: Date) {
  if (view === 'month') {
    return format(date, 'yyyy년 M월', { locale: ko }); // "2024년 6월"
  }

  if (view === 'week') {
    const start = startOfWeek(date, { locale: ko });
    const end = endOfWeek(date, { locale: ko });

    return `${format(date, 'yyyy년', { locale: ko })} ${format(
      start,
      'M월 d일',
      { locale: ko }
    )} ~ ${format(end, 'M월 d일', { locale: ko })}`;
  }

  if (view === 'day') {
    return format(date, 'yyyy년 M월 d일 EEE요일', { locale: ko });
  }

  return '';
}
