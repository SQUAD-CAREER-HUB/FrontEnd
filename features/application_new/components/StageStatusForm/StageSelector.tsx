'use client'

import { useShallow } from 'zustand/shallow'
import LabeledDropdown from '../common/LabeledDropdown'
import { useNewApplicationStore, StageType } from '../../stores/useNewApplicationStore'

const stageOptions = [
  { value: 'document', label: '서류 전형' },
  { value: 'other', label: '기타 전형' },
  { value: 'interview', label: '면접 전형' },
  { value: 'closed', label: '지원 종료' },
]

export default function StageSelector() {
  const { stage, setStage } = useNewApplicationStore(
    useShallow((state) => ({
      stage: state.stage,
      setStage: state.setStage,
    }))
  )

  return (
    <LabeledDropdown
      label="전형 단계"
      required
      options={stageOptions}
      value={stage}
      onValueChange={(v) => setStage(v as StageType)}
      placeholder="전형 단계 선택"
    />
  )
}
