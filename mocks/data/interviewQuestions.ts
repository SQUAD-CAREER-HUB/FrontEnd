import { faker } from '@faker-js/faker';
import { InterviewQuestion } from '@/features/my-interview-questions/types/interviewQuestion.types';

// Generate mock data
const generateMockQuestion = (): InterviewQuestion => ({
  id: faker.string.uuid(),
  title: faker.lorem.sentence({ min: 5, max: 10 }),
  company: faker.company.name(),
  position: faker.person.jobTitle(),
  category: faker.helpers.arrayElement(['기술', '인성', '경험', '프로젝트']),
  createdAt: faker.date.past({ years: 1 }).toISOString(),
  updatedAt: faker.date.recent({ days: 30 }).toISOString(),
  content: faker.lorem.paragraphs(3),
});

export const mockInterviewQuestions: InterviewQuestion[] = Array.from(
  { length: 15 },
  generateMockQuestion
);