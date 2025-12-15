import { ToolbarProps } from 'react-big-calendar';
import { endOfWeek, format, startOfWeek } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { useDateScheduleCreateStore } from '../../_stores/useDateScheduleCreateStore';
import { useFilterPanelStore } from '../../_stores/useFilterPanelStore';
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from '@/components/ui/button-group';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarPlusIcon,
  PanelRightIcon,
} from 'lucide-react';
import { RbcEvent } from '../../_types/rbcEvent';

export function Toolbar({
  date,
  onNavigate,
  onView,
  view,
}: ToolbarProps<RbcEvent>) {
  const open = useDateScheduleCreateStore((state) => state.open);
  const { isOpen, open: toggleFilterPanel } = useFilterPanelStore();
  const title = getTitleNode(view, date);

  return (
    <div className='flex flex-col gap-y-2 p-4 md:flex-row md:items-center md:justify-between'>
      <ButtonGroup className='gap-2 items-center'>
        <Button onClick={() => onNavigate('PREV')}>
          <ArrowLeftIcon />
        </Button>
        <div className='text-lg font-semibold'>{title}</div>
        <Button onClick={() => onNavigate('NEXT')}>
          <ArrowRightIcon />
        </Button>
      </ButtonGroup>

      <div className='flex gap-1'>
        <ButtonGroup>
          <Button onClick={() => onView('month')}>월</Button>
          <ButtonGroupSeparator />
          <Button onClick={() => onView('week')}>주</Button>
          <ButtonGroupSeparator />
          <Button onClick={() => onView('day')}>일</Button>
        </ButtonGroup>
        <Button onClick={() => onNavigate('TODAY')}>오늘</Button>
        <Button onClick={() => open(null)}>
          <CalendarPlusIcon /> 일정 추가
        </Button>
        {isOpen ? null : (
          <Button onClick={() => toggleFilterPanel()}>
            <PanelRightIcon />
          </Button>
        )}
      </div>
    </div>
  );
}

function getTitleNode(view: string, date: Date) {
  if (view === 'month') {
    return (
      <span className='text-lg font-semibold'>
        {format(date, 'yyyy년 M월', { locale: ko })}
      </span>
    );
  }

  if (view === 'week') {
    const start = startOfWeek(date, { locale: ko });
    const end = endOfWeek(date, { locale: ko });

    return (
      <div className='flex items-center gap-2'>
        <span className='text-base font-semibold'>
          {format(date, 'yyyy년', { locale: ko })}
        </span>

        <span className='text-sm text-muted-foreground'>
          {format(start, 'M월 d일', { locale: ko })}
        </span>

        <span className='text-muted-foreground'>~</span>

        <span className='text-sm text-muted-foreground'>
          {format(end, 'M월 d일', { locale: ko })}
        </span>
      </div>
    );
  }

  if (view === 'day') {
    return (
      <div className='flex items-center gap-2'>
        <span className='text-base font-semibold'>
          {format(date, 'yyyy년', { locale: ko })}
        </span>

        <span className='text-sm text-muted-foreground'>
          {format(date, 'M월 d일', { locale: ko })}
        </span>
      </div>
    );
  }

  return null;
}
