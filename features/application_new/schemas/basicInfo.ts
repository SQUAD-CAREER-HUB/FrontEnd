import { z } from 'zod';

export const basicInfoSchema = z.object({
  company: z.string().min(1, '회사명을 입력해주세요.'),
  position: z.string().min(1, '직무를 입력해주세요.'),
  deadline: z.string().min(1, '마감 일시를 입력해주세요.'),
  jobLocation: z.string().optional(),
});

export type BasicInfoData = z.infer<typeof basicInfoSchema>;

export const validateBasicInfo = (data: BasicInfoData) => {
  return basicInfoSchema.safeParse(data);
};
