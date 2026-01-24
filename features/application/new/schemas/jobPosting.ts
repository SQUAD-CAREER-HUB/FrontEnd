import { z } from 'zod';

// URL 검증 스키마
export const jobPostingUrlSchema = z
  .string()
  .min(1, 'URL을 입력해주세요.')
  .url('올바른 URL 형식이 아닙니다.')
  .refine(
    (url) => {
      try {
        const parsed = new URL(url);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
      } catch {
        return false;
      }
    },
    { message: 'http:// 또는 https://로 시작하는 URL을 입력해주세요.' }
  );

// URL 검증 함수
export const validateJobPostingUrl = (url: string) => {
  return jobPostingUrlSchema.safeParse(url);
};
