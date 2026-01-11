'use client'

import { useState } from 'react'
import { Link } from 'lucide-react'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import CardWrapper from '../common/CardWrapper'
import { useNewApplicationStore } from '../../stores/useNewApplicationStore'
import { useRouter } from 'next/navigation'
import GetJobPostButton from './getJobPostButton'
import { useShallow } from 'zustand/shallow'

interface URLFormProps {
  onSkip?: () => void
}

export default function URLForm({ onSkip }: URLFormProps) {
  const [error, setError] = useState<string>('');

  const { url, setUrl } = useNewApplicationStore(useShallow((state) => ({
    url: state.url,
    setUrl: state.setUrl,
  })));
  const router = useRouter();

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    if (error) setError('');
  };

  return (
    <CardWrapper>
      <div className="space-y-6 text-center py-8">
        {/* Icon */}
        <div className="w-20 h-20 bg-brand-50 dark:bg-brand-900/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <Link className="w-10 h-10 text-brand-500" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          채용 공고 URL 입력
        </h2>

        {/* Description */}
        <p className="text-slate-500 dark:text-slate-400">
          AI가 공고 내용을 분석하여 자동으로 정보를 입력합니다.
        </p>

        {/* Input */}
        <div className="max-w-md mx-auto relative mt-8">
          <Input
            type="url"
            value={url}
            onChange={handleUrlChange}
            placeholder="https://recruit.company.com/..."
            className={`w-full h-12 px-4 rounded-xl ${
              error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
            }`}
          />
          {error && (
            <p className="mt-2 text-sm text-red-500 text-left">{error}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button onClick={() => {
            router.back();
          }} variant="ghost" className="text-slate-500">
            취소
          </Button>
          <GetJobPostButton
            onError={setError}
            onClearError={() => setError('')}
          />
        </div>

        {/* Skip Link */}
        <button
          type="button"
          onClick={onSkip}
          className="text-sm text-slate-400 hover:text-slate-600 underline"
        >
          건너뛰고 직접 입력하기
        </button>
      </div>
    </CardWrapper>
  )
}
