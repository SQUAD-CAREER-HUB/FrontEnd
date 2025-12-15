import { CalendarEvent } from '../_types/calendar';
import { RbcEvent } from '../_types/rbcEvent';

function getEventTitle(event: CalendarEvent) {
  switch (event.processType) {
    case 'DOCUMENT':
      return `${event.companyName} | ${
        event.documentStatus === 'SUBMITTED' ? '서류 제출 완료' : '서류 미제출'
      }`;

    case 'INTERVIEW':
      return `${event.companyName} | ${event.interviewTitle}`;

    case 'ETC':
      return `${event.companyName} | ${event.etcTitle}`;

    default:
      return '';
  }
}

export function mapCalendarEventsToRbcEvents(
  events: CalendarEvent[]
): RbcEvent[] {
  return events?.map((event) => ({
    title: getEventTitle(event),
    start: new Date(event.startDateTime),
    end: new Date(event.endDateTime),
    allDay: event.processType === 'DOCUMENT',
    resource: event,
  }));
}
