import { ScheduleItem } from '../types';
import { RbcEvent } from '../types/rbcEvent';

function getEventTitle(event: ScheduleItem) {
  switch (event.stageType) {
    case 'DOCUMENT':
      return event.documentStatus === 'SUBMITTED' ? '제출' : '미제출';

    case 'INTERVIEW':
      return `${event.scheduleName}`;

    case 'ETC':
      return `${event.scheduleName}`;

    default:
      return '';
  }
}

export function mapCalendarEventsToRbcEvents(
  events: ScheduleItem[]
): RbcEvent[] {
  return events?.map((event) => {
    if (event.stageType === 'DOCUMENT') {
      return {
        title: getEventTitle(event),
        start: new Date(event.startedAt),
        end: new Date(event.endedAt),
        allDay: true,
        resource: event,
      };
    } else {
      return {
        title: getEventTitle(event),
        start: new Date(event.startedAt),
        end: new Date(event.endedAt),
        allDay: false,
        resource: event,
      };
    }
  });
}
