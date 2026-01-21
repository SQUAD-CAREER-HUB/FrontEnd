import { ApplicationCreationStatisticsResponse } from '@/features/dashboard/types/api';
import { ENV } from '@/shared/constants/env';
import { endOfWeek, format, startOfWeek, subMonths, subWeeks } from 'date-fns';
import { http, HttpResponse } from 'msw';

export const applicationHandlers = [
  http.get(`${ENV.BFF_API_URL}/applications`, () => {
    return HttpResponse.json();
  }),

  http.get(`${ENV.BFF_API_URL}/v1/applications/statistics`, () => {
    return HttpResponse.json({
      totalApplicationCount: 100,
      docStageCount: 45,
      etcStageCount: 20,
      interviewStageCount: 15,
      finalPassedCount: 8,
      finalFailedCount: 12,
    });
  }),

  http.get(`${ENV.BFF_API_URL}/v1/applications/before-deadline`, () => {
    return HttpResponse.json({
      contents: [
        {
          applicationId: 101,
          company: 'Naver',
          position: 'Frontend Developer',
          deadline: '2026-01-15T23:59:59',
          applicationMethod: '홈페이지 접수',
          submissionStatus: 'SUBMITTED',
        },
        {
          applicationId: 102,
          company: 'Toss',
          position: 'Product Designer',
          deadline: '2026-01-18T18:00:00',
          applicationMethod: '이메일 지원',
          submissionStatus: 'NOT_SUBMITTED',
        },
        {
          applicationId: 103,
          company: 'Naver',
          position: 'Frontend Developer',
          deadline: '2026-01-15T23:59:59',
          applicationMethod: '홈페이지 접수',
          submissionStatus: 'SUBMITTED',
        },
        {
          applicationId: 104,
          company: 'Toss',
          position: 'Product Designer',
          deadline: '2026-01-18T18:00:00',
          applicationMethod: '이메일 지원',
          submissionStatus: 'NOT_SUBMITTED',
        },
      ],
      hasNext: false,
      nextCursorId: null,
    });
  }),

  http.get('*/v1/applications/statistics/creation', ({ request }) => {
    const url = new URL(request.url);
    const weekCount = Number(url.searchParams.get('weekCount')) || 6;
    const monthCount = Number(url.searchParams.get('monthCount')) || 6;

    const now = new Date();

    // 주간 데이터 생성 (실제 날짜 계산)
    const weeklyStatistics = Array.from({ length: weekCount }, (_, i) => {
      const targetDate = subWeeks(now, i);
      const start = startOfWeek(targetDate, { weekStartsOn: 1 }); // 월요일 시작
      const end = endOfWeek(targetDate, { weekStartsOn: 1 }); // 일요일 종료

      return {
        period: `${format(start, 'MM.dd')} - ${format(end, 'MM.dd')}`,
        count: Math.floor(Math.random() * 10),
        isCurrentWeek: i === 0,
      };
    }).reverse();

    // 2. 월간 데이터 생성 (실제 날짜 계산)
    const monthlyStatistics = Array.from({ length: monthCount }, (_, i) => {
      const targetDate = subMonths(now, i);

      return {
        period: format(targetDate, 'yyyy.MM'),
        count: Math.floor(Math.random() * 30) + 10,
        isCurrentMonth: i === 0,
      };
    }).reverse();

    return HttpResponse.json<ApplicationCreationStatisticsResponse>({
      weeklyStatistics,
      monthlyStatistics,
    });
  }),
];
