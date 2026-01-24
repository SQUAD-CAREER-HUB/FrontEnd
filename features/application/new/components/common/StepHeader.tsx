interface StepHeaderProps {
  title: string
  description: string
}

export default function StepHeader({ title, description }: StepHeaderProps) {
  return (
    <div className="text-center mb-6">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
        {title}
      </h2>
      <p className="text-slate-500 dark:text-slate-400">
        {description}
      </p>
    </div>
  )
}
