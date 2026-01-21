import { ReactNode } from 'react'

interface FormContainerProps {
  children: ReactNode
}

export default function FormContainer({ children }: FormContainerProps) {
  return (
    <div className="space-y-5 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 text-left">
      {children}
    </div>
  )
}
