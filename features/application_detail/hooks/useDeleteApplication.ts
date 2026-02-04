import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { deleteApplication } from '../api/deleteApplication';

export function useDeleteApplication(applicationId: number) {
  const router = useRouter();

  return useMutation({
    mutationFn: () => deleteApplication(applicationId),
    onSuccess: () => {
      router.push('/applications');
    },
    onError: (error) => {
      console.error('Delete Application Error:', error);
      alert('지원 삭제에 실패했습니다. 다시 시도해 주세요.');
    },
  });
}
