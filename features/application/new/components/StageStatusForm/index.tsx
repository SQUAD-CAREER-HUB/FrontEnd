'use client'

import CardWrapper from '../common/CardWrapper'
import StepNavigation from '../common/StepNavigation'
import StepHeader from '../common/StepHeader'
import FormContainer from '../common/FormContainer'
import StageSelector from './StageSelector'
import DocumentStageFields from './DocumentStageFields'
import InterviewStageFields from './InterviewStageFields'
import OtherStageFields from './OtherStageFields/OtherStageFields'
import { useNewApplicationStore } from '../../stores/useNewApplicationStore'

interface StageStatusFormProps {
  onNext?: () => void
  onPrev?: () => void
}

export default function StageStatusForm({ onNext, onPrev }: StageStatusFormProps) {
  const stage = useNewApplicationStore((state) => state.stage)

  return (
    <CardWrapper>
      <div className="max-w-lg mx-auto space-y-8 py-4">
        <StepHeader
          title="전형 상태 설정"
          description="현재 지원 단계와 상세 내용을 기록합니다."
        />

        <FormContainer>
          <StageSelector />
          {stage === 'document' && <DocumentStageFields />}
          {stage === 'interview' && <InterviewStageFields />}
          {stage === 'other' && <OtherStageFields />}
        </FormContainer>

        <StepNavigation onPrev={onPrev} onNext={onNext} />
      </div>
    </CardWrapper>
  )
}
