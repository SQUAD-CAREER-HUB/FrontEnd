'use client'

interface StepNavigationProps {
  onPrev?: () => void
  onNext?: () => void
  prevLabel?: string
  nextLabel?: string
  showPrev?: boolean
}

export default function StepNavigation({
  onPrev,
  onNext,
  prevLabel = '이전',
  nextLabel = '다음 단계',
  showPrev = true,
}: StepNavigationProps) {
  return (
    <div className="flex justify-between pt-4">
      {showPrev ? (
        <button
          type="button"
          onClick={onPrev}
          className="px-6 py-3 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-bold transition-colors"
        >
          {prevLabel}
        </button>
      ) : (
        <div />
      )}
      <button
        type="button"
        onClick={onNext}
        className="px-10 py-3 bg-brand-500 text-white font-bold rounded-xl hover:bg-brand-600 shadow-lg shadow-brand-200 dark:shadow-none transition-all"
      >
        {nextLabel}
      </button>
    </div>
  )
}
