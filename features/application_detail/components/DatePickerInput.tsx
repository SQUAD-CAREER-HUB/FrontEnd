import { DateTimePicker } from "./DateTimePicker"
import { Label } from "@/shared/components/ui/label"

interface DatePickerInputProps {
  value?: string
  label?: string;
  onChange?: (date: Date | undefined, valueString: string) => void
  placeholder?: string
  className?: string
}

export function DatePickerInput({
  value = "",
  label = "",
  className = "",
}: DatePickerInputProps) {


  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <Label htmlFor={value} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{label}</Label>

      <DateTimePicker />
    </div>
  )
}