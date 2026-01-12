import { http, HttpResponse } from 'msw';

import { ENV } from '@/shared/constants/env';
import { fakerKO as faker } from '@faker-js/faker';

const STAGE_TYPES = [
  'DOCUMENT',
  'ETC',
  'INTERVIEW',
  'APPLICATION_CLOSE',
] as const;

export const calendarHandlers = [
  http.get(`${ENV.BFF_API_URL}/v1/schedules`, async ({ request }) => {
    const url = new URL(request.url);
    const from = url.searchParams.get('from');
    const to = url.searchParams.get('to');
    const companyName = url.searchParams.get('companyName');
    const stageTypes = url.searchParams.get('stageTypes')?.split(',') || [];

    // 필차 파라미터 체크 (Bad Request 시뮬레이션)
    if (!from || !to) {
      return HttpResponse.json(
        { statusCode: 400, message: 'from, to 파라미터는 필수입니다.' },
        { status: 400 }
      );
    }

    // 데이터 생성 로직
    const generateSchedules = (count: number) => {
      return Array.from({ length: count }, (_, i) => {
        // from ~ to 사이의 랜덤 날짜 생성
        const startDate = faker.date.between({
          from: new Date(from),
          to: new Date(to),
        });
        const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1시간 뒤 종료

        return {
          scheduleId: i + 1,
          applicationId: faker.number.int({ min: 100, max: 999 }),
          companyName: companyName || faker.company.name(),
          stageType: faker.helpers.arrayElement(
            stageTypes.length > 0 ? stageTypes : STAGE_TYPES
          ),
          documentStatus: `${faker.helpers.arrayElement([
            'NOT_SUBMITTED',
            'SUBMITTED',
          ])}`,
          scheduleName: `${faker.company.name()} ${faker.helpers.arrayElement([
            '1차 면접',
            '코딩 테스트',
            '서류 마감',
            '커피챗',
          ])}`,
          startedAt: startDate.toISOString(),
          endedAt: endDate.toISOString(),
          location: faker.helpers.arrayElement([
            '서울 강남구 테헤란로 123',
            'ZOOM 온라인 면접',
            'Google Meet',
            faker.location.streetAddress(),
          ]),
        };
      }).sort(
        (a, b) =>
          new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime()
      ); // 오름차순 정렬
    };

    // 캘린더 뷰를 풍성하게 하기 위해 약 15개의 일정을 반환
    const items = generateSchedules(15);

    return HttpResponse.json({ items });
  }),
];
