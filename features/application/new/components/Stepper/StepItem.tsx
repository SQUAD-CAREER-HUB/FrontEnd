'use client'

interface StepItemProps {
  step: number;
  label: string;
  active?: boolean;
}

export function StepItem({ step, label, active = false }: StepItemProps) {
  return (
    <div className="flex flex-col items-center space-y-2 z-10">
      <div
        className={`
          w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2
          transition-all duration-300
          ${
            active
              ? 'bg-white dark:bg-slate-900 border-brand-500 text-brand-600 dark:text-brand-400'
              : 'bg-white dark:bg-slate-900 border-slate-200 text-slate-300 dark:border-slate-700'
          }
        `}
      >
        {step}
      </div>

      <span
        className={`
          text-xs font-medium whitespace-nowrap absolute top-10
          ${active ? 'text-brand-600 dark:text-brand-400 font-bold' : 'text-slate-400 dark:text-slate-500'}
        `}
      >
        {label}
      </span>
    </div>
  );
}
