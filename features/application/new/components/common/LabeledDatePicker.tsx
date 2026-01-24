'use client'

import { CalendarIcon } from 'lucide-react'
import FormLabel from './FormLabel'
import { Button } from '@/shared/components/ui/button'
import { Calendar } from '@/shared/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover'

interface LabeledDatePickerProps {
  label: string
  required?: boolean
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
}

const formatDate = (date: Date | undefined) => {
  if (!date) return ''
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function LabeledDatePicker({
  label,
  required = false,
  value,
  onChange,
  placeholder = '날짜를 선택하세요',
}: LabeledDatePickerProps) {
  return (
    <div>
      <FormLabel required={required}>{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-12 justify-between rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-left font-normal"
          >
            <span className={value ? 'text-slate-900 dark:text-white' : 'text-slate-400'}>
              {value ? formatDate(value) : placeholder}
            </span>
            <CalendarIcon className="h-4 w-4 text-slate-400" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
