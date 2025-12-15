import { http, HttpResponse } from 'msw';

export const applicationHandlers = [
  http.get('/api/applications', () => {
    return HttpResponse.json();
  }),
];
