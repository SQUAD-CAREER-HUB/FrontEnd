'use client'

import FormLabel from './FormLabel'
import { DropDown } from '@/shared/components/DropDown'

interface DropDownOption {
  value: string
  label: string
}

interface LabeledDropdownProps {
  label: string
  required?: boolean
  options: DropDownOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  className?: string
}

export default function LabeledDropdown({
  label,
  required = false,
  options,
  value,
  onValueChange,
  placeholder,
  className = 'h-12',
}: LabeledDropdownProps) {
  return (
    <div>
      <FormLabel required={required}>{label}</FormLabel>
      <DropDown
        options={options}
        value={value}
        onValueChange={onValueChange}
        placeholder={placeholder}
        className={className}
      />
    </div>
  )
}
