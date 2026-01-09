'use client';

import { Calendar, dateFnsLocalizer, DateLocalizer } from 'react-big-calendar';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import { ko } from 'date-fns/locale/ko';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';
import { Toolbar } from './Toolbar';
import { useDateScheduleListStore } from '../../stores/useDateScheduleListStore';
import { WeekViewHeader } from './WeekViewHeader';
import TimeGutterHeader from './TimeGutterHeader';
import { CalendarEvent } from '@/features/calendar/types/calendar';
import { mapCalendarEventsToRbcEvents } from '../../utils/mapCalendarEventsToRbcEvents';
import { useCalendarViewStore } from '../../stores/useCalendarViewStore';
import DayViewHeader from './DayViewHeader';
import MonthViewEvent from './MonthViewEvent';
import WeekViewEvent from './WeekViewEvent';
import { MonthViewDateHeader } from './MonthViewDateHeader';
import DateCellWrapper from './DateCellWrapper';
import { MonthViewHeader } from './MonthViewHeader';

const locales = {
  ko: ko,
};

const formats = {
  // 월간 뷰(Month View)의 날짜 숫자 포맷 커스텀
  // 'dd'는 01, 02 형식이고 'd'는 1, 2 형식
  dateFormat: (date: Date, culture?: string, localizer?: DateLocalizer) =>
    localizer!.format(date, 'd', culture), // 'd'로 설정하여 앞의 0 제거
  timeGutterFormat: (
    date: Date,
    culture?: string,
    localizer?: DateLocalizer
  ) => {
    return localizer!.format(date, 'a h', 'en-US');
  },
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function RbcCalendarWrapper({
  events,
}: {
  events: CalendarEvent[];
}) {
  const { view, date, setView, setDate } = useCalendarViewStore();

  const openListModal = useDateScheduleListStore((state) => state.open);

  const rbcEvents = mapCalendarEventsToRbcEvents(events);

  return (
    <div id='calendar-wrapper' className='w-[calc(100%-320px)] h-full flex-1'>
      <Calendar
        view={view}
        views={{
          month: true,
          week: true,
          day: true,
        }}
        date={date}
        onView={(nextView) => setView(nextView)}
        onNavigate={(nextDate) => setDate(nextDate)}
        components={{
          toolbar: Toolbar,
          dateCellWrapper: DateCellWrapper,
          month: {
            event: MonthViewEvent,
            dateHeader: MonthViewDateHeader,
            header: MonthViewHeader,
          },
          week: {
            header: WeekViewHeader,
            event: WeekViewEvent,
          },
          day: {
            header: DayViewHeader,
            event: WeekViewEvent,
          },
          timeGutterHeader: TimeGutterHeader,
        }}
        selectable
        onSelectSlot={(slotInfo) => {
          if (view === 'month') {
            openListModal(slotInfo.start);
          }
        }}
        onSelectEvent={(rbcEvent) => {
          if (view === 'month') {
            openListModal(rbcEvent.start);
          }
        }}
        culture='ko'
        formats={formats}
        localizer={localizer}
        startAccessor='start'
        endAccessor='end'
        events={rbcEvents}
      />
    </div>
  );
}
