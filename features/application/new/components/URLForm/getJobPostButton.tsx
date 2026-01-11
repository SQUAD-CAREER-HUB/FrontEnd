'use client';

import { Button } from '@/shared/components/ui/button';
import { useShallow } from 'zustand/shallow';
import { useNewApplicationStore } from '../../stores/useNewApplicationStore';
import { useGetJobPosting } from '../../hooks/useGetJobPosting';
import { validateJobPostingUrl } from '../../schemas/jobPosting';
import { Loader2 } from 'lucide-react';

interface GetJobPostButtonProps {
  onError?: (error: string) => void;
  onClearError?: () => void;
}

export default function GetJobPostButton({ onError, onClearError }: GetJobPostButtonProps) {
  const { url, setCompany, setPosition, setDeadline, setJobLocation, nextStep } =
    useNewApplicationStore(
      useShallow((state) => ({
        url: state.url,
        setCompany: state.setCompany,
        setPosition: state.setPosition,
        setDeadline: state.setDeadline,
        setJobLocation: state.setJobLocation,
        nextStep: state.nextStep,
      }))
    );

  const { mutate, isPending } = useGetJobPosting();

  const handleFetch = () => {
    const result = validateJobPostingUrl(url);

    if (!result.success) {
      const errorMessage = result.error.issues[0]?.message || 'URL을 확인해주세요.';
      onError?.(errorMessage);
      return;
    }

    onClearError?.();

    mutate(url, {
      onSuccess: (data) => {
        setCompany(data.company);
        setPosition(data.position);
        setDeadline(data.deadline);
        setJobLocation(data.workplace);
        nextStep();
      },
      onError: (error) => {
        console.error('채용공고 정보 불러오기 실패:', error);
        onError?.('채용공고 정보를 불러오는데 실패했습니다.');
      },
    });
  };

  return (
    <Button
      onClick={handleFetch}
      disabled={isPending}
      className="bg-brand-500 hover:bg-brand-600 text-white px-8 rounded-xl disabled:opacity-50"
    >
      {isPending ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          불러오는 중...
        </>
      ) : (
        '정보 불러오기'
      )}
    </Button>
  );
}
