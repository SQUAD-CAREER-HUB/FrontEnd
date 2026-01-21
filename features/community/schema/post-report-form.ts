import * as z from 'zod';

export const reportSchema = z
  .object({
    // z.string() 안에 객체를 넣지 않고, .min()에서 메시지를 관리합니다.
    reasonType: z.string().min(1, '신고 사유를 선택해 주세요.'),

    // etcDetail은 선택 사항이지만, 아래 superRefine에서 조건부로 체크합니다.
    etcDetail: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // 사유가 'ETC'(기타)인데 상세 내용이 비어있는 경우 에러 발생
    if (
      data.reasonType === 'ETC' &&
      (!data.etcDetail || data.etcDetail.trim().length === 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '상세 사유를 반드시 입력해 주세요.',
        path: ['etcDetail'], // 에러를 etcDetail 필드에 표시
      });
    }
  });

export type ReportFormValues = z.infer<typeof reportSchema>;
