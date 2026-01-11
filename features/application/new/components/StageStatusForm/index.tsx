'use client'

import CardWrapper from '../common/CardWrapper'
import StepNavigation from '../common/StepNavigation'
import StepHeader from '../common/StepHeader'
import FormContainer from '../common/FormContainer'
import { DropDown } from '@/shared/components/DropDown'
import StatusButtonGroup from '@/features/application_detail/components/StatusButtonGroup'
import { useNewApplicationStore, StageType, DocumentStatus, ApplicationMethod } from '../../stores/useNewApplicationStore'

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
  const {
    stage,
    documentStatus,
    applicationMethod,
    result,
    setStage,
    setDocumentStatus,
    setApplicationMethod,
    setResult,
  } = useNewApplicationStore();

  return (
    <CardWrapper>
      <div className="max-w-lg mx-auto space-y-8 py-4">
        <StepHeader
          title="전형 상태 설정"
          description="현재 지원 단계와 상세 내용을 기록합니다."
        />

        <FormContainer>
          {/* 전형 단계 */}
          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-1.5 ml-1">
              전형 단계 <span className="text-red-500">*</span>
            </label>
            <DropDown
              options={stageOptions}
              value={stage}
              onValueChange={(value) => setStage(value as StageType)}
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
                onValueChange={(value) => setDocumentStatus(value as DocumentStatus)}
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
                onValueChange={(value) => setApplicationMethod(value as ApplicationMethod)}
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
        </FormContainer>

        <StepNavigation onPrev={onPrev} onNext={onNext} />
      </div>
    </CardWrapper>
  )
}
