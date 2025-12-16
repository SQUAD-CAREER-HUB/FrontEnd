import { CalendarEvent } from '../_types/calendar';
import { RbcEvent } from '../_types/rbcEvent';

function getEventTitle(event: CalendarEvent) {
  switch (event.processType) {
    case 'DOCUMENT':
      return event.documentStatus === 'SUBMITTED'
        ? '서류 제출 완료'
        : '서류 제출 필요';

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
  return events?.map((event) => ({
    title: getEventTitle(event),
    start:
      event.processType === 'DOCUMENT'
        ? new Date(event.applicationDeadline)
        : new Date(event.startDateTime),
    end:
      event.processType === 'DOCUMENT'
        ? new Date(event.applicationDeadline)
        : new Date(event.startDateTime),
    allDay: event.processType === 'DOCUMENT',
    resource: event,
  }));
}
