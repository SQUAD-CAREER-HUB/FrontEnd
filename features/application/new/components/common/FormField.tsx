'use client'

import { InputHTMLAttributes, ReactNode } from 'react'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  required?: boolean
  rightElement?: ReactNode
}

export default function FormField({
  label,
  required = false,
  rightElement,
  className,
  ...props
}: FormFieldProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5 ml-1">
        <label className="block text-sm font-bold text-slate-900 dark:text-white">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {rightElement}
      </div>
      <input
        className="w-full p-3.5 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none bg-white dark:bg-slate-900 dark:text-white transition-all"
        {...props}
      />
    </div>
  )
}
