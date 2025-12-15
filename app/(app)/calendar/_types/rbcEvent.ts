import { CalendarEvent } from './calendar';

export type RbcEvent = {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource: CalendarEvent;
};
