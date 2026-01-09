import { Button } from "@/shared/components/ui/button"
import { RotateCcw, Save } from "lucide-react"

interface ActionButtonsProps {
  onCancel?: () => void
  onSave?: () => void
  cancelText?: string
  saveText?: string
  disabled?: boolean
  loading?: boolean
  className?: string
}

export function BottomActiveButtons({
  onCancel,
  onSave,
  cancelText = "취소",
  saveText = "저장",
  disabled = false,
  loading = false,
  className = ""
}: ActionButtonsProps) {
  return (
    <div className={`flex items-center gap-2 self-end ${className}`}>
      <Button
        onClick={onCancel}
        variant="ghost"
        disabled={disabled || loading}
        className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 flex items-center gap-1.5"
      >
        <RotateCcw className="w-3 h-3" />
        <span>{cancelText}</span>
      </Button>
      <Button
        onClick={onSave}
        disabled={disabled || loading}
        className="px-5 py-1.5 bg-brand-500 text-white rounded-lg text-xs font-bold shadow-md flex items-center gap-1.5 hover:bg-brand-600 disabled:opacity-50"
      >
        <Save className="w-3 h-3" />
        <span>{loading ? "저장 중..." : saveText}</span>
      </Button>
    </div>
  )
}