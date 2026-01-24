'use client'

import { Upload } from 'lucide-react'
import { InputHTMLAttributes, useId } from 'react'

interface FileUploadButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'> {
  variant?: 'default' | 'compact'
  label?: string
}

export default function FileUploadButton({
  variant = 'default',
  label = '파일 추가',
  ...props
}: FileUploadButtonProps) {
  const id = useId()

  if (variant === 'compact') {
    return (
      <label
        htmlFor={id}
        className="cursor-pointer text-[10px] font-black text-brand-600 bg-brand-50 dark:bg-brand-900/30 rounded-md hover:bg-brand-100 dark:hover:bg-brand-900/50 transition-colors px-2 py-1 inline-flex items-center"
      >
        <Upload className="w-3 h-3 mr-1" />
        {label}
        <input type="file" id={id} className="hidden" {...props} />
      </label>
    )
  }

  return (
    <label
      htmlFor={id}
      className="cursor-pointer text-sm text-brand-500 hover:text-brand-600 flex items-center gap-1 transition-colors"
    >
      <Upload className="w-4 h-4" />
      {label}
      <input type="file" id={id} className="hidden" {...props} />
    </label>
  )
}
