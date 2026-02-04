'use client'

import { ReactNode } from 'react'

interface FormLabelProps {
  children: ReactNode
  required?: boolean
  className?: string
}

export default function FormLabel({ children, required = false, className = '' }: FormLabelProps) {
  return (
    <label className={`block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1 ${className}`}>
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  )
}
