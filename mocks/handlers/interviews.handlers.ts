import { http, HttpResponse } from 'msw';

import { ENV } from '@/shared/constants/env';

export const interviewsHandlers = [
  http.get(`${ENV.BFF_API_URL}/v1/interviews/upcoming`, () => {
    return HttpResponse.json({
      interviews: [
        {
          id: 10,
          applicationId: 1,
          type: 'TECH',
          typeDetail: '1차 기술 면접',
          datetime: '2025-12-30T10:00:00', // 오늘/내일 일정
          location: '서울 강남구 테헤란로 123',
          onlineLink: 'https://zoom.us/j/tech-1',
          result: 'WAITING',
          createdAt: '2025-12-01T10:00:00',
          updatedAt: '2025-12-01T10:00:00',
        },
        {
          id: 11,
          applicationId: 2,
          type: 'CULTURE_FIT',
          typeDetail: '컬처핏 면접',
          datetime: '2025-12-31T14:30:00',
          location: '서울 마포구 상암동',
          onlineLink: null,
          result: 'WAITING',
          createdAt: '2025-12-05T11:00:00',
          updatedAt: '2025-12-05T11:00:00',
        },
        {
          id: 12,
          applicationId: 3,
          type: 'PERSONALITY',
          typeDetail: '임원 면접',
          datetime: '2026-01-02T16:00:00',
          location: '경기도 성남시 분당구',
          onlineLink: 'https://meet.google.com/abc-defg-hij',
          result: 'WAITING',
          createdAt: '2025-12-10T09:00:00',
          updatedAt: '2025-12-10T09:00:00',
        },
        {
          id: 13,
          applicationId: 4,
          type: 'ASSIGNMENT_REVIEW',
          typeDetail: '과제 리뷰 전형',
          datetime: '2026-01-05T13:00:00',
          location: '온라인 진행',
          onlineLink: 'https://zoom.us/j/assign-review',
          result: 'WAITING',
          createdAt: '2025-12-15T15:00:00',
          updatedAt: '2025-12-15T15:00:00',
        },
      ],
      hasNext: false,
      nextCursorId: null,
    });
  }),
];
