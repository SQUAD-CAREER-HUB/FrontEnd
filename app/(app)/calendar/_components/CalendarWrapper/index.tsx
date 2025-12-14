'use client';

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format } from 'date-fns/format';
import { parse } from 'date-fns/parse';
import { startOfWeek } from 'date-fns/startOfWeek';
import { getDay } from 'date-fns/getDay';
import { ko } from 'date-fns/locale/ko';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';
import { CustomToolbar } from './CustomToolbar';

const locales = {
  ko: ko,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarWrapper() {
  return (
    <div id='calendar-wrapper' className='h-full'>
      <Calendar
        components={{
          toolbar: CustomToolbar,
        }}
        culture='ko'
        localizer={localizer}
        startAccessor='start'
        endAccessor='end'
      />
    </div>
  );
}
