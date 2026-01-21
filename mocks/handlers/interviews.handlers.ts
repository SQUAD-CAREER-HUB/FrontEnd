import { http, HttpResponse } from 'msw';

import { ENV } from '@/shared/constants/env';

export const interviewsHandlers = [
  http.get(`${ENV.BFF_API_URL}/v1/schedules/upcoming`, () => {
    return HttpResponse.json({
      contents: [
        {
          scheduleId: 501,
          applicationId: 1,
          companyName: '우아한형제들',
          stageType: 'INTERVIEW',
          scheduleName: '1차 기술 면접',
          startedAt: '2026-01-13T14:00:00', // D-1
          location: '잠실역 롯데타워',
        },
        {
          scheduleId: 502,
          applicationId: 2,
          companyName: 'Google Korea',
          stageType: 'INTERVIEW',
          scheduleName: 'Final Interview',
          startedAt: '2026-01-15T10:00:00', // D-3
        },
        {
          scheduleId: 503,
          applicationId: 3,
          companyName: 'Kakao',
          stageType: 'ETC',
          scheduleName: '문화 적합성 인터뷰',
          startedAt: '2026-01-20T16:00:00', // D-8
        },
      ],
      hasNext: false,
      nextCursorId: null,
    });
  }),
];
