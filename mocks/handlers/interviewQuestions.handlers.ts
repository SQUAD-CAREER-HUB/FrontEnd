import { http, HttpResponse } from 'msw';
import { mockInterviewQuestions } from '../data/interviewQuestions';

export const interviewQuestionsHandlers = [
  // GET - Get all questions
  http.get('/api/interview-questions', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');
    const category = url.searchParams.get('category');
    const company = url.searchParams.get('company');

    let filteredQuestions = [...mockInterviewQuestions];

    if (search) {
      filteredQuestions = filteredQuestions.filter(
        (q) =>
          q.title.toLowerCase().includes(search.toLowerCase()) ||
          q.company.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      filteredQuestions = filteredQuestions.filter((q) => q.category === category);
    }

    if (company) {
      filteredQuestions = filteredQuestions.filter((q) => q.company === company);
    }

    return HttpResponse.json({
      data: filteredQuestions,
      total: filteredQuestions.length,
      page: 1,
      pageSize: 20,
    });
  }),

  // GET - Get single question by ID
  http.get('/api/interview-questions/:id', ({ params }) => {
    const { id } = params;
    const question = mockInterviewQuestions.find((q) => q.id === id);

    if (!question) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(question);
  }),

  // DELETE - Delete question
  http.delete('/api/interview-questions/:id', ({ params }) => {
    const { id } = params;
    const index = mockInterviewQuestions.findIndex((q) => q.id === id);

    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    mockInterviewQuestions.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];