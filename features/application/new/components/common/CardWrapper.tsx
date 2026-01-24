'use client'

import { ReactNode } from 'react'

interface CardWrapperProps {
  children: ReactNode
}

export default function CardWrapper({ children }: CardWrapperProps) {
  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl min-h-[400px]">
      {children}
    </div>
  )
}
