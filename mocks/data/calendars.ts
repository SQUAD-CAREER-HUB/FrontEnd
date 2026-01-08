import { faker } from '@faker-js/faker';

// TODO: features/calendar이 구현되면 실제 타입으로 교체
type CalendarEvent = {
  id: string;
  applicationId: string;
  companyName: string;
  processType: 'DOCUMENT' | 'INTERVIEW' | 'ETC';
  interviewTitle?: string;
  interviewLocation?: string;
  etcTitle?: string;
  etcLocation?: string;
  startDateTime: string;
  endDateTime: string;
  documentStatus?: 'SUBMITTED' | 'NOT_SUBMITTED';
  resultStatus?: 'PROCESS_PASS' | 'FINAL_PASS' | 'FINAL_FAIL';
  applicationDeadline: string;
};

const startDate = new Date('2025-12-01T00:00:00');
const endDate = new Date('2026-01-31T23:59:59');

function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export const mockCalendarEvents = Array.from({
  length: 30,
}).map((_, i) => {
  const processType = faker.helpers.arrayElement([
    'DOCUMENT',
    'INTERVIEW',
    'ETC',
  ]) as CalendarEvent['processType'];
  const startDateTime = randomDate(startDate, endDate);
  const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 2000); // 2시간

  return {
    id: `evt-${i + 1}`,
    applicationId: `app-${100 + i}`,
    companyName: faker.company.name(),
    processType,
    interviewTitle:
      processType === 'INTERVIEW' ? faker.lorem.text() + ' 면접' : undefined,
    interviewLocation:
      processType === 'INTERVIEW' ? faker.location.city() : undefined,
    etcTitle: processType === 'ETC' ? faker.company.catchPhrase() : undefined,
    etcLocation: processType === 'ETC' ? faker.location.city() : undefined,
    startDateTime: startDateTime.toISOString(),
    endDateTime: endDateTime.toISOString(),
    documentStatus:
      processType === 'DOCUMENT'
        ? faker.helpers.arrayElement(['SUBMITTED', 'NOT_SUBMITTED'])
        : undefined,
    resultStatus:
      processType === 'INTERVIEW'
        ? faker.helpers.arrayElement([
            'PROCESS_PASS',
            'FINAL_PASS',
            'FINAL_FAIL',
          ])
        : undefined,
    applicationDeadline: randomDate(startDate, startDateTime).toISOString(),
  };
});
