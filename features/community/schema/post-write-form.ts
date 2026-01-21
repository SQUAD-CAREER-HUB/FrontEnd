import * as z from 'zod';

export const postWriteSchema = z.object({
  companyName: z.string().min(1, '회사명을 입력해주세요.'),
  position: z.string().min(1, '직무를 입력해주세요.'),
  interviewType: z.string().min(1, '면접 종류를 선택해주세요.'),
  questions: z
    .array(
      z.object({
        id: z.number().optional(),
        content: z.string().min(1, '질문 내용을 입력해주세요.'),
      })
    )
    .min(1, '최소 1개의 질문이 필요합니다.'),
  content: z.string().min(10, '후기를 최소 10자 이상 작성해주세요.'),
});

export type PostWriteFormValues = z.infer<typeof postWriteSchema>;
