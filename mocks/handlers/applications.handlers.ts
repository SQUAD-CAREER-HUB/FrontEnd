import { ENV } from '@/shared/constants/env';
import { http, HttpResponse } from 'msw';

export const applicationHandlers = [
  http.get(`${ENV.BFF_API_URL}/applications`, () => {
    return HttpResponse.json();
  }),
];
