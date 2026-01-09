'use client'

import CardWrapper from '../common/CardWrapper'
import FormField from '../common/FormField'
import StepNavigation from '../common/StepNavigation'
import FileUploadButton from '@/shared/components/FileUploadButton'

interface BasicInfoFormProps {
  onNext?: () => void
  onPrev?: () => void
}

export default function BasicInfoForm({ onNext, onPrev }: BasicInfoFormProps) {
  return (
    <CardWrapper>
      <div className="max-w-lg mx-auto space-y-8 py-4">
        <div className='text-center mb-6'>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            기본 정보 확인
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            모든 필수 정보를 입력해주세요.
          </p>
        </div>
        <div className="space-y-5 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 text-left mt-8">
          <FormField
            label="회사명"
            required
            placeholder="예: Toss"
          />

          <FormField
            label="직무"
            required
            placeholder="예: Product Designer"
          />

          <FormField
            label="마감 일시"
            required
            type="datetime-local"
            placeholder="연도-월-일 --:--"
          />

          <FormField
            label="근무지 (선택)"
            placeholder="예: 판교 테크원타워"
          />

          {/* File Upload */}
          <div>
            <div className="flex items-center justify-between mb-1.5 ml-1">
              <label className="block text-sm font-bold text-slate-900 dark:text-white">
                첨부파일 (선택)
              </label>
              <FileUploadButton />
            </div>
            <div className="w-full p-4 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-center">
              <p className="text-sm text-slate-400">
                이력서나 포트폴리오를 미리 업로드해두세요.
              </p>
            </div>
          </div>
        </div>
        <StepNavigation />
      </div>
    </CardWrapper>
  )
}
