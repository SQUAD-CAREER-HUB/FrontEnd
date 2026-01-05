import { ENV } from '@/shared/constants/env';
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
    return HttpResponse.json([
      {
        applicationId: 1,
        company: '라인플러스',
        position: 'Global SW Engineer',
        deadline: '2025-12-31T14:00:00.000Z',
        applicationMethod: '홈페이지 지원',
        submissionStatus: '마감 임박', // "제출", "미제출", "마감 임박" 등으로 가정
      },
      {
        applicationId: 2,
        company: '버킷플레이스 (오늘의집)',
        position: '데이터 분석가',
        deadline: '2026-01-12T14:00:00.000Z',
        applicationMethod: '홈페이지 지원',
        submissionStatus: '미제출',
      },
      {
        applicationId: 3,
        company: '두나무',
        position: 'iOS 개발자',
        deadline: '2026-01-08T14:00:00.000Z',
        applicationMethod: '홈페이지 지원',
        submissionStatus: '제출 완료',
      },
      {
        applicationId: 4,
        company: '쿠팡',
        position: 'PO',
        deadline: '2026-01-03T14:00:00.000Z',
        applicationMethod: '홈페이지 지원',
        submissionStatus: '제출 완료',
      },
    ]);
  }),
];
