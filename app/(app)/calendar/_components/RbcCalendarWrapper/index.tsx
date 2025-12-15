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
import { useDateScheduleListStore } from '../../_stores/useDateScheduleListStore';
import { WeekDayHeader } from './WeekDayHeader';
import TimeGutterHeader from './TimeGutterHeader';
import { CalendarEvent } from '../../_types/calendar';
import { mapCalendarEventsToRbcEvents } from '../../_utils/mapCalendarEventsToRbcEvents';
import Event from './Event';
import { useCalendarViewStore } from '../../_stores/useCalendarViewStore';

const locales = {
  ko: ko,
};

const formats = {
  timeGutterFormat: (
    date: Date,
    culture?: string,
    localizer?: DateLocalizer
  ) => {
    if (!localizer) return '';
    return localizer.format(date, 'a h', 'en-US');
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
        date={date}
        onView={(nextView) => setView(nextView)}
        onNavigate={(nextDate) => setDate(nextDate)}
        components={{
          event: Event,
          toolbar: Toolbar,
          week: {
            header: WeekDayHeader,
          },
          timeGutterHeader: TimeGutterHeader,
        }}
        selectable
        onSelectSlot={(slotInfo) => {
          console.log('🚀 ~ RbcCalendarWrapper ~ slotInfo:', slotInfo);
          openListModal(slotInfo.start);
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
