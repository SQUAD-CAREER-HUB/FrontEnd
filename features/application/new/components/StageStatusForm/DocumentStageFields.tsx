'use client'

import { useShallow } from 'zustand/shallow'
import LabeledDropdown from '../common/LabeledDropdown'
import LabeledStatusGroup from '../common/LabeledStatusGroup'
import { useNewApplicationStore, DocumentStatus, ApplicationMethod } from '../../stores/useNewApplicationStore'

const documentStatusOptions = [
  { value: 'NOT_SUBMITTED', label: '미제출' },
  { value: 'SUBMITTED', label: '제출 완료' },
]

const applicationMethodOptions = [
  { value: 'HOMEPAGE', label: '홈페이지 지원' },
  { value: 'EMAIL', label: '이메일' },
  { value: 'PLATFORM', label: '채용 플랫폼' },
  { value: 'REFERAL', label: '지인 추천' },
]

export default function DocumentStageFields() {
  const {
    documentStatus,
    applicationMethod,
    result,
    setDocumentStatus,
    setApplicationMethod,
    setResult,
  } = useNewApplicationStore(
    useShallow((state) => ({
      documentStatus: state.documentStatus,
      applicationMethod: state.applicationMethod,
      result: state.result,
      setDocumentStatus: state.setDocumentStatus,
      setApplicationMethod: state.setApplicationMethod,
      setResult: state.setResult,
    }))
  )

  return (
    <div className="animate-fade-in space-y-5">
      <LabeledDropdown
        label="서류 상세 상태"
        required
        options={documentStatusOptions}
        value={documentStatus}
        onValueChange={(value) => setDocumentStatus(value as DocumentStatus)}
        placeholder="상태 선택"
      />

      <LabeledDropdown
        label="지원 방식"
        required
        options={applicationMethodOptions}
        value={applicationMethod}
        onValueChange={(value) => setApplicationMethod(value as ApplicationMethod)}
        placeholder="지원 방식 선택"
      />

      <LabeledStatusGroup
        label="전형 결과"
        value={result}
        onChange={setResult}
      />
    </div>
  )
}
