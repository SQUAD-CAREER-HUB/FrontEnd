'use client'

import { Link } from 'lucide-react'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'

export default function URLForm() {
  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl min-h-[400px]">
      <div className="space-y-6 text-center py-8">
        {/* Icon */}
        <div className="w-20 h-20 bg-brand-50 dark:bg-brand-900/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
          <Link className="w-10 h-10 text-brand-500" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          채용 공고 URL 입력
        </h2>

        {/* Description */}
        <p className="text-slate-500 dark:text-slate-400">
          AI가 공고 내용을 분석하여 자동으로 정보를 입력합니다.
        </p>

        {/* Input */}
        <div className="max-w-md mx-auto relative mt-8">
          <Input
            type="url"
            placeholder="https://recruit.company.com/..."
            className="w-full h-12 px-4 rounded-xl"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button variant="ghost" className="text-slate-500">
            취소
          </Button>
          <Button className="bg-brand-500 hover:bg-brand-600 text-white px-8 rounded-xl">
            정보 불러오기
          </Button>
        </div>

        {/* Skip Link */}
        <button className="text-sm text-slate-400 hover:text-slate-600 underline">
          건너뛰고 직접 입력하기
        </button>
      </div>
    </div>
  )
}