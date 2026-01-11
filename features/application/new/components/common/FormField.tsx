'use client'

import { InputHTMLAttributes, ReactNode } from 'react'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  required?: boolean
  rightElement?: ReactNode
  error?: string
}

export default function FormField({
  label,
  required = false,
  rightElement,
  error,
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
        className={`w-full p-3.5 border rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none bg-white dark:bg-slate-900 dark:text-white transition-all ${
          error
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : 'border-slate-200 dark:border-slate-700'
        }`}
        {...props}
      />
      {error && (
        <p className="mt-1 ml-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}
