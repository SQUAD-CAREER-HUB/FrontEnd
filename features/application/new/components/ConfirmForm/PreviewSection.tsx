'use client'

import { Monitor } from 'lucide-react'
import PreviewCard from './PreviewCard'

interface PreviewSectionProps {
  companyName: string
  position: string
}

export default function PreviewSection({ companyName, position }: PreviewSectionProps) {
  return (
    <div className="text-left mt-8 max-w-sm mx-auto">
      <div className="text-xs font-bold text-slate-400 mb-2 ml-1 flex items-center gap-1.5 uppercase tracking-widest">
        <Monitor className="w-3.5 h-3.5" />
        미리보기
      </div>
      <PreviewCard companyName={companyName} position={position} />
    </div>
  )
}
