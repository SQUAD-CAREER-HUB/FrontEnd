'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import LabeledDropdown from '../../common/LabeledDropdown'
import LabeledInput from '../../common/LabeledInput'
import LabeledStatusGroup from '../../common/LabeledStatusGroup'
import { DatePickerInput } from '@/features/application_detail/components/DatePickerInput'
import { useNewApplicationStore, ScheduleResult } from '../../../stores/useNewApplicationStore'

const interviewTypeOptions = [
  { value: 'first', label: '1차 면접' },
  { value: 'second', label: '2차 면접' },
  { value: 'technical', label: '기술 면접' },
  { value: 'culture', label: '컬처핏 면접' },
  { value: 'executive', label: '임원 면접' },
  { value: 'hr', label: '인사 면접' },
  { value: 'final', label: '최종 면접' },
  { value: 'other', label: '기타 (직접 입력)' },
]

const interviewTypeLabels: Record<string, string> = {
  first: '1차 면접',
  second: '2차 면접',
  technical: '기술 면접',
  culture: '컬처핏 면접',
  executive: '임원 면접',
  hr: '인사 면접',
  final: '최종 면접',
}

export default function CreateInterviewScheduleForm() {
  const addInterviewSchedule = useNewApplicationStore((state) => state.addInterviewSchedule)

  const [type, setType] = useState('first')
  const [customType, setCustomType] = useState('')
  const [datetime, setDatetime] = useState<Date | undefined>(new Date())
  const [location, setLocation] = useState('')
  const [result, setResult] = useState<ScheduleResult>('WAITING')

  const handleAdd = () => {
    const scheduleName = type === 'other' ? customType : interviewTypeLabels[type]

    if (!scheduleName) return

    addInterviewSchedule({
      id: crypto.randomUUID(),
      scheduleName,
      startedAt: datetime?.toISOString() || new Date().toISOString(),
      location,
      scheduleResult: result,
    })

    // 폼 초기화
    setType('first')
    setCustomType('')
    setDatetime(new Date())
    setLocation('')
    setResult('WAITING')
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border-2 border-brand-100 dark:border-brand-900/30 space-y-4 shadow-md">
      {/* 헤더 */}
      <div className="text-xs font-black text-brand-600 dark:text-brand-400 uppercase tracking-wider flex items-center">
        <Plus className="w-3.5 h-3.5 mr-1" aria-hidden="true" />
        새 면접 추가
      </div>

      {/* 면접 종류 */}
      <div>
        <LabeledDropdown
          label="면접 종류"
          required
          options={interviewTypeOptions}
          value={type}
          onValueChange={setType}
          placeholder="면접 종류 선택"
        />
        {type === 'other' && (
          <Input
            className="mt-2 h-12 rounded-xl border-slate-200 dark:border-slate-700"
            placeholder="면접 종류를 직접 입력하세요"
            value={customType}
            onChange={(e) => setCustomType(e.target.value)}
          />
        )}
      </div>

      {/* 시작 일시 */}
      <DatePickerInput
        label="시작 일시"
        value={datetime}
        onChange={(date) => setDatetime(date)}
        id="startDate"
        required={true}
      />

      {/* 장소/링크 */}
      <LabeledInput
        label="장소/링크"
        placeholder="장소 (예: Google Meet, 본사)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      {/* 전형 결과 */}
      <LabeledStatusGroup
        label="전형 결과"
        value={result}
        onChange={setResult}
      />

      {/* 추가 버튼 */}
      <Button
        type="button"
        variant="default"
        onClick={handleAdd}
        className="w-full py-3 bg-brand-500 text-white font-black rounded-xl hover:bg-brand-600 transition-all text-xs flex justify-center items-center shadow-lg shadow-brand-100 dark:shadow-none"
      >
        <Plus className="w-4 h-4 mr-2" />
        면접 일정 추가하기
      </Button>
    </div>
  )
}
