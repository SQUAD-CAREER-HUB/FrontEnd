import * as z from 'zod';

export const interviewQuestionSchema = z.object({
  applicationId: z.number().min(1, '지원서 ID가 필요합니다.'),
  interviewQuestionId: z.number().nullable().optional(),
  interviewType: z.string().min(1, '면접 전형을 선택해주세요.'),
  question: z.string().min(3, '질문은 3자 이상 입력해주세요.'),
  memo: z.string().min(5, '메모는 5자 이상 입력해주세요.'),
});

export type InterviewQuestionFormValues = z.infer<typeof interviewQuestionSchema>;
