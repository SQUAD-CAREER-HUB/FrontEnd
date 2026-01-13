'use client'

import CardWrapper from '../common/CardWrapper'
import SuccessIcon from './SuccessIcon'
import PreviewSection from './PreviewSection'
import { useNewApplicationStore } from '../../stores/useNewApplicationStore'
import { useApplicationCreateRequest } from '../../hooks/useApplicationCreateRequest'
import { useCreateApplication } from '../../hooks/useCreateApplication'

interface ConfirmFormProps {
  onPrev?: () => void
  onSubmit?: () => void
}

export default function ConfirmForm({
  onPrev,
  onSubmit,
}: ConfirmFormProps) {
  const data = useApplicationCreateRequest();
  const { mutate: createApplication, isPending } = useCreateApplication();
  console.log(data);
  const handleSubmit = () => {
    createApplication(data, {
      onSuccess: () => {
        onSubmit?.();
      },
      onError: (error) => {
        console.error('지원 카드 생성 실패:', error);
      },
    });
  };
  return (
    <CardWrapper>
      <div className="max-w-lg mx-auto py-4">
        <SuccessIcon />

        {/* 타이틀 */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            저장 준비 완료
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            지원 현황 리스트에 아래와 같이 표시됩니다.
          </p>
        </div>

        <PreviewSection
          companyName={data.request.jobPosting.company || '회사명 미입력'}
          position={data.request.jobPosting.position || '직무 미입력'}
        />

        {/* 하단 버튼 */}
        <div className="flex justify-between pt-8 border-t border-slate-100 dark:border-slate-800 mt-10">
          <button
            type="button"
            onClick={onPrev}
            className="px-6 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-bold transition-colors"
          >
            이전
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
            className="px-10 py-3 bg-brand-500 text-white font-bold rounded-xl hover:bg-brand-600 shadow-lg shadow-brand-200 dark:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? '생성 중...' : '카드 생성하기'}
          </button>
        </div>
      </div>
    </CardWrapper>
  )
}
