import { z } from 'zod';

// 면접 일정 스키마
export const interviewScheduleSchema = z.object({
  scheduleName: z.string().min(1, '전형 이름을 입력해주세요.'),
  startedAt: z.string().min(1, '시작 일시를 입력해주세요.'),
  location: z.string().optional().default(''),
});

export type InterviewScheduleFormData = z.infer<typeof interviewScheduleSchema>;

export const validateInterviewSchedule = (data: InterviewScheduleFormData) => {
  return interviewScheduleSchema.safeParse(data);
};

// 기타 전형 일정 스키마
export const etcScheduleSchema = z.object({
  scheduleName: z.string().min(1, '전형 이름을 입력해주세요.'),
  startedAt: z.string().min(1, '시작 일시를 입력해주세요.'),
  endedAt: z.string().optional().default(''),
}).refine(
  (data) => {
    if (!data.endedAt || !data.startedAt) return true;
    return new Date(data.endedAt) >= new Date(data.startedAt);
  },
  { message: '종료 일시는 시작 일시 이후여야 합니다.', path: ['endedAt'] }
);

export type EtcScheduleFormData = z.infer<typeof etcScheduleSchema>;

export const validateEtcSchedule = (data: EtcScheduleFormData) => {
  return etcScheduleSchema.safeParse(data);
};
