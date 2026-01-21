import * as z from 'zod';

export const profileSchema = z.object({
  nickname: z.string().min(2, '닉네임은 2글자 이상 입력해 주세요.'),
  profileImageUrl: z.any().optional(), // 파일 업로드 처리용
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
