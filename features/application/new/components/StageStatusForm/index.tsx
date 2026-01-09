'use client'

import { useState } from 'react'
import CardWrapper from '../common/CardWrapper'
import StepNavigation from '../common/StepNavigation'
import { DropDown } from '@/shared/components/DropDown'
import StatusButtonGroup from '@/features/application_detail/components/StatusButtonGroup'

interface StageStatusFormProps {
  onNext?: () => void
  onPrev?: () => void
}

const stageOptions = [
  { value: 'document', label: '서류 전형' },
  { value: 'other', label: '기타 전형' },
  { value: 'interview', label: '면접 전형' },
  { value: 'closed', label: '지원 종료' },
]

const documentStatusOptions = [
  { value: 'not_submitted', label: '미제출' },
  { value: 'submitted', label: '제출 완료' },
]

const applicationMethodOptions = [
  { value: 'website', label: '홈페이지 지원' },
  { value: 'email', label: '이메일' },
  { value: 'platform', label: '채용 플랫폼' },
  { value: 'referral', label: '지인 추천' },
]

export default function StageStatusForm({ onNext, onPrev }: StageStatusFormProps) {
  const [stage, setStage] = useState('document')
  const [documentStatus, setDocumentStatus] = useState('not_submitted')
  const [applicationMethod, setApplicationMethod] = useState('website')
  const [result, setResult] = useState<'WAITING' | 'PASS' | 'FAILED'>('WAITING')

  return (
    <CardWrapper>
      <div className="max-w-lg mx-auto space-y-8 py-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            전형 상태 설정
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            현재 지원 단계와 상세 내용을 기록합니다.
          </p>
        </div>

        <div className="space-y-5 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 text-left">
          {/* 전형 단계 */}
          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-1.5 ml-1">
              전형 단계 <span className="text-red-500">*</span>
            </label>
            <DropDown
              options={stageOptions}
              value={stage}
              onValueChange={setStage}
              placeholder="전형 단계 선택"
              className="h-12"
            />
          </div>

          {/* 서류 상세 상태부터 전형 결과까지 묶음 */}
          <div className="animate-fade-in space-y-5">
            {/* 서류 상세 상태 */}
            <div>
              <label className="block text-sm font-bold text-slate-900 dark:text-white mb-1.5 ml-1">
                서류 상세 상태 <span className="text-red-500">*</span>
              </label>
              <DropDown
                options={documentStatusOptions}
                value={documentStatus}
                onValueChange={setDocumentStatus}
                placeholder="상태 선택"
                className="h-12"
              />
            </div>

            {/* 지원 방식 */}
            <div>
              <label className="block text-sm font-bold text-slate-900 dark:text-white mb-1.5 ml-1">
                지원 방식 <span className="text-red-500">*</span>
              </label>
              <DropDown
                options={applicationMethodOptions}
                value={applicationMethod}
                onValueChange={setApplicationMethod}
                placeholder="지원 방식 선택"
                className="h-12"
              />
            </div>

            {/* 전형 결과 */}
            <div>
              <label className="block text-sm font-bold text-slate-900 dark:text-white mb-1.5 ml-1">
                전형 결과
              </label>
              <StatusButtonGroup
                status={result}
                onStatusChange={setResult}
              />
            </div>
          </div>
        </div>

        <StepNavigation onPrev={onPrev} onNext={onNext} />
      </div>
    </CardWrapper>
  )
}
