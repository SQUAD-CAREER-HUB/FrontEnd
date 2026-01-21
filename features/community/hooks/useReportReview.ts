import { useMutation } from '@tanstack/react-query';

import { reportReview, ReportReviewRequest } from '../api/reportReview';
import { ApiError } from '@/shared/lib/api/errors';

export const useReportReview = () => {
  return useMutation({
    mutationFn: (data: ReportReviewRequest) => reportReview(data),

    onSuccess: () => {
      alert(
        '신고가 정상적으로 접수되었습니다. 검토까지 최대 24시간이 소요될 수 있습니다.'
      );
    },

    // 3. 에러 발생 시 처리 (ApiError 활용)
    onError: (error: unknown) => {
      if (error instanceof ApiError) {
        // 백엔드에서 내려준 상세 에러 코드별 대응
        switch (error.statusCode) {
          case 400:
            // 유효성 검사 에러가 있을 경우 상세 메시지 표시
            const validationMsg = error.validation
              ? Object.values(error.validation).join(', ')
              : error.message;
            alert(`신고 내용을 확인해주세요: ${validationMsg}`);
            break;

          case 401:
            alert('로그인이 필요한 기능입니다.');
            // 필요 시 로그인 모달을 띄우거나 페이지 이동
            break;

          case 404:
            alert('존재하지 않는 게시글입니다.');
            break;

          default:
            alert(error.message);
        }
      } else {
        // 네트워크 에러 등 ApiError가 아닌 일반 에러
        alert('서버와의 통신이 원활하지 않습니다. 잠시 후 다시 시도해주세요.');
      }
    },
  });
};
