"use client"

import * as React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

interface DropDownOption {
  value: string
  label: string
}

interface DropDownProps {
  options: DropDownOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function DropDown({ 
  options, 
  value, 
  onValueChange, 
  placeholder = "선택하세요",
  className = "",
  disabled = false
}: DropDownProps) {
  console.log(options);
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={`w-full flex items-center justify-between px-3 py-1.5 
        bg-white dark:bg-slate-900 
        border border-slate-200 dark:border-slate-700 
        rounded-xl text-left transition-all 
        hover:border-slate-300 dark:hover:border-slate-600 
        cursor-pointer 
        text-slate-700 dark:text-slate-200 
        text-xs font-bold
        data-[state=open]:border-brand-600
        data-[state=open]:text-brand-600
        data-[state=open]:ring-2 
        data-[state=open]:ring-brand-100
        ${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent side="bottom" sideOffset={1} position="popper">
        {options?.map((option) => (
          <SelectItem 
            key={option.value} 
            value={option.value} 
            className="px-3 py-2 rounded-lg cursor-pointer flex items-center justify-between text-xs transition-colors text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}