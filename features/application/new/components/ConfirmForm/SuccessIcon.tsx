'use client'

import { CircleCheck } from 'lucide-react'

export default function SuccessIcon() {
  return (
    <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
      <CircleCheck className="w-10 h-10" strokeWidth={2.5} />
    </div>
  )
}
