'use client'

import { useShallow } from 'zustand/shallow'
import CreateInterviewScheduleForm from './CreateInterviewScheduleForm'
import InterviewScheduleViewCard from './InterviewScheduleViewCard'
import { useNewApplicationStore } from '../../../stores/useNewApplicationStore'

export default function InterviewStageFields() {
  const { interviewSchedules, deleteInterviewSchedule } = useNewApplicationStore(
    useShallow((state) => ({
      interviewSchedules: state.interviewSchedules,
      deleteInterviewSchedule: state.deleteInterviewSchedule,
    }))
  )

  return (
    <div className="animate-fade-in space-y-4">
      {/* 추가된 면접 일정 목록 */}
      {interviewSchedules.map((schedule) => (
        <InterviewScheduleViewCard
          key={schedule.id}
          schedule={schedule}
          onDelete={deleteInterviewSchedule}
        />
      ))}

      {/* 새 면접 추가 폼 */}
      <CreateInterviewScheduleForm />
    </div>
  )
}
