'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { DateTimeInput } from '@/shared/components/DateTimeInput'
import LabeledInput from '../../common/LabeledInput'
import LabeledStatusGroup from '../../common/LabeledStatusGroup'
import { useNewApplicationStore, ScheduleResult } from '../../../stores/useNewApplicationStore'

export default function CreateOtherScheduleForm() {
  const addOtherSchedule = useNewApplicationStore((state) => state.addOtherSchedule)

  const [scheduleName, setScheduleName] = useState('')
  const [startedAt, setStartedAt] = useState(new Date().toISOString().slice(0, 19))
  const [endedAt, setEndedAt] = useState(new Date().toISOString().slice(0, 19))
  const [result, setResult] = useState<ScheduleResult>('WAITING')

  const handleAdd = () => {
    if (!scheduleName.trim()) return

    addOtherSchedule({
      id: crypto.randomUUID(),
      scheduleName: scheduleName.trim(),
      startedAt: startedAt || new Date().toISOString(),
      endedAt: endedAt || new Date().toISOString(),
      scheduleResult: result,
    })

    // 폼 초기화
    setScheduleName('')
    setStartedAt(new Date().toISOString().slice(0, 19))
    setEndedAt(new Date().toISOString().slice(0, 19))
    setResult('WAITING')
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border-2 border-brand-100 dark:border-brand-900/30 space-y-4 shadow-md">
      {/* 헤더 */}
      <div className="text-xs font-black text-brand-600 dark:text-brand-400 uppercase tracking-wider flex items-center">
        <Plus className="w-3.5 h-3.5 mr-1" aria-hidden="true" />
        새 기타 전형 추가
      </div>

      {/* 전형명 */}
      <LabeledInput
        label="전형명"
        required
        placeholder="예: 온라인 코딩 테스트, 과제 전형"
        value={scheduleName}
        onChange={(e) => setScheduleName(e.target.value)}
      />

      {/* 시작/종료 일시 */}
      <div className="grid grid-cols-2 gap-3">
        <DateTimeInput
          label="시작 일시"
          value={startedAt}
          onChange={setStartedAt}
        />
        <DateTimeInput
          label="종료 일시"
          value={endedAt}
          onChange={setEndedAt}
        />
      </div>

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
        기타 전형 추가하기
      </Button>
    </div>
  )
}
