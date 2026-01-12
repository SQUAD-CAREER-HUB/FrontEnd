'use client'

import { useShallow } from 'zustand/shallow'
import CreateOtherScheduleForm from './CreateOtherScheduleForm'
import OtherScheduleViewCard from './OtherScheduleViewCard'
import { useNewApplicationStore } from '../../../stores/useNewApplicationStore'

export default function OtherStageFields() {
  const { otherSchedules, deleteOtherSchedule } = useNewApplicationStore(
    useShallow((state) => ({
      otherSchedules: state.otherSchedules,
      deleteOtherSchedule: state.deleteOtherSchedule,
    }))
  )

  return (
    <div className="animate-fade-in space-y-4">
      {otherSchedules.map((schedule) => (
        <OtherScheduleViewCard
          key={schedule.id}
          schedule={schedule}
          onDelete={deleteOtherSchedule}
        />
      ))}

      <CreateOtherScheduleForm />
    </div>
  )
}
