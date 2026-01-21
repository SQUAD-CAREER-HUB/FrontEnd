import { http, HttpResponse } from 'msw';
import { ENV } from '@/shared/constants/env';
import { fakerKO as faker } from '@faker-js/faker';
import { INTERVIEW_PRESETS } from '@/shared/constants/interview';

export const questionsHandlers = [
  http.get(`${ENV.BFF_API_URL}/v1/archive/questions`, ({ request }) => {
    const url = new URL(request.url);
    const cursor = url.searchParams.get('lastCursorId');
    const limit = Number(url.searchParams.get('size')) || 20;

    const selectedPreset = faker.helpers.arrayElement(INTERVIEW_PRESETS);

    // 더미 데이터 생성 함수
    const generateQuestions = (count: number) => {
      return Array.from({ length: count }, (_, index) => ({
        id: Number(cursor || 0) + index + 1,
        applicationId: faker.number.int({ min: 1, max: 100 }),
        interviewQuestionId: faker.number.int({ min: 1000, max: 9999 }),
        question: `${faker.helpers.arrayElement([
          '프로젝트 진행 중 갈등 상황을 어떻게 해결했나요',
          '본인이 사용한 기술 스택의 장단점은 무엇인가요',
          '협업 과정에서 가장 중요하게 생각하는 가치는',
          '우리 회사에 지원하게 된 가장 큰 동기는',
          '자신의 기술적 강점에 대해 설명해주세요',
        ])} (${faker.lorem.word()} 관련)?`,
        answer: faker.lorem.paragraphs(1), // 답변 내용
        fromCommunity: faker.datatype.boolean(),
        createdAt: faker.date.past().toISOString(),
        updatedAt: faker.date.recent().toISOString(),
        // 대시보드 UI 확인을 위해 추가될 수 있는 데이터들
        company: faker.company.name(),
        position: faker.person.jobTitle(),
        interviewType: selectedPreset.value,
      }));
    };

    const questions = generateQuestions(limit);
    const hasNext = Number(cursor || 0) < 20; // 테스트를 위해 20개까지만 생성
    const nextCursorId = hasNext ? questions[questions.length - 1].id : null;

    return HttpResponse.json({
      questions,
      hasNext,
      nextCursorId,
    });
  }),
];
