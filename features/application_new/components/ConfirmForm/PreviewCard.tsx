'use client'

import { ChevronRight } from 'lucide-react'

interface PreviewCardProps {
  companyName: string
  position: string
}

export default function PreviewCard({ companyName, position }: PreviewCardProps) {
  return (
    <div className="relative rounded-2xl p-6 border bg-white dark:bg-slate-900 border-brand-200 dark:border-brand-800 shadow-xl flex flex-col justify-between min-h-[220px] ring-4 ring-brand-50 dark:ring-brand-900/20 animate-fade-in">
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="pr-2 min-w-0">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 truncate">
              {companyName}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium truncate">
              {position}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
        <span className="text-xs font-bold text-brand-500 flex items-center">
          상세 보기
          <ChevronRight className="w-3 h-3 ml-0.5" />
        </span>
      </div>
    </div>
  )
}
