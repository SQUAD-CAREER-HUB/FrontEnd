import { CalendarEvent } from '../types/calendar';
import { RbcEvent } from '../types/rbcEvent';

function getEventTitle(event: CalendarEvent) {
  switch (event.processType) {
    case 'DOCUMENT':
      return event.documentStatus === 'SUBMITTED' ? '제출' : '미제출';

    case 'INTERVIEW':
      return `${event.interviewTitle}`;

    case 'ETC':
      return `${event.etcTitle}`;

    default:
      return '';
  }
}

export function mapCalendarEventsToRbcEvents(
  events: CalendarEvent[]
): RbcEvent[] {
  return events?.map((event) => {
    if (event.processType === 'DOCUMENT') {
      return {
        title: getEventTitle(event),
        start: new Date(event.applicationDeadline),
        end: new Date(event.applicationDeadline),
        allDay: true,
        resource: event,
      };
    } else {
      return {
        title: getEventTitle(event),
        start: new Date(event.startDateTime),
        end: new Date(event.endDateTime),
        allDay: false,
        resource: event,
      };
    }
  });
}
