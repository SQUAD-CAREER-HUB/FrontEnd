import * as z from 'zod';

const baseSchema = z.object({
  applicationId: z.string().min(1, '대상 기업을 선택해주세요.'),
  startedAt: z.string().min(1, '시작 일시를 입력해주세요.'),
});

export const interviewSchema = baseSchema
  .extend({
    interviewType: z.string().min(1, '면접 종류를 선택해주세요.'),
    customInterviewType: z.string().optional(),
    location: z.string().min(1, '면접 장소 또는 링크를 입력해주세요.'),
  })
  .refine(
    (data) => {
      // interviewType이 'ETC'일 때만 customInterviewType이 필수임
      if (data.interviewType === 'ETC') {
        return data.customInterviewType && data.customInterviewType.length > 0;
      }
      return true;
    },
    {
      message: '면접 종류를 입력해주세요.',
      path: ['customInterviewType'], // 에러 메시지를 띄울 경로
    }
  );

export const etcSchema = baseSchema.extend({
  scheduleName: z.string().min(1, '일정 명칭을 입력해주세요.'),
  endedAt: z.string().min(1, '종료 일시를 입력해주세요.'),
});

export type InterviewFormValues = z.infer<typeof interviewSchema>;
export type EtcFormValues = z.infer<typeof etcSchema>;
