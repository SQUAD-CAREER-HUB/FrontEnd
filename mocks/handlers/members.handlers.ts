import { http, HttpResponse } from 'msw';
import { ENV } from '@/shared/config/env';

export const membersHandlers = [
  http.get(`${ENV.BFF_API_URL}/v1/members/profile`, () => {
    return HttpResponse.json({
      memberId: 1,
      nickname: 'test-user',
      role: 'ROLE_MEMBER',
      createdAt: '2025-11-30T12:34:56',
    });
  }),
];
