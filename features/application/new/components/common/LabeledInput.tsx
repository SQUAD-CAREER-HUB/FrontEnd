'use client'

import { InputHTMLAttributes } from 'react'
import FormLabel from './FormLabel'
import { Input } from '@/shared/components/ui/input'

interface LabeledInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string
  required?: boolean
  className?: string
}

export default function LabeledInput({
  label,
  required = false,
  className = '',
  ...props
}: LabeledInputProps) {
  return (
    <div>
      <FormLabel required={required}>{label}</FormLabel>
      <Input
        className={`h-12 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 ${className}`}
        {...props}
      />
    </div>
  )
}
