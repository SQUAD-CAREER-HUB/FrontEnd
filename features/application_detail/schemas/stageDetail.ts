import { z } from 'zod';

export const stageDetailSchema = z.object({
  company: z.string().min(1, '회사명을 입력해주세요.'),
  position: z.string().min(1, '직무를 입력해주세요.'),
  jobLocation: z.string(),
  jobPostingUrl: z.string().refine(
    (url) => {
      if (!url) return true;
      try {
        const parsed = new URL(url);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
      } catch {
        return false;
      }
    },
    { message: 'http:// 또는 https://로 시작하는 URL을 입력해주세요.' }
  ),
  memo: z.string(),
});

export type StageDetailFormValues = z.infer<typeof stageDetailSchema>;

export const validateStageDetail = (data: StageDetailFormValues) => {
  return stageDetailSchema.safeParse(data);
};
