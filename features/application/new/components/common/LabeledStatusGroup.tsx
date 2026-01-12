'use client'

import FormLabel from './FormLabel'
import StatusButtonGroup from '@/features/application_detail/components/StatusButtonGroup'

type StatusType = 'WAITING' | 'PASS' | 'FAILED'

interface LabeledStatusGroupProps {
  label: string
  required?: boolean
  value: StatusType
  onChange?: (status: StatusType) => void
}

export default function LabeledStatusGroup({
  label,
  required = false,
  value,
  onChange,
}: LabeledStatusGroupProps) {
  return (
    <div>
      <FormLabel required={required}>{label}</FormLabel>
      <StatusButtonGroup status={value} onStatusChange={onChange} />
    </div>
  )
}
