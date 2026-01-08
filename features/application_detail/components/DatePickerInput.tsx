import { DateTimePicker } from "./DateTimePicker"
import FormLabel from "./common/FormLabel"

interface DatePickerInputProps {
  value?: Date
  label?: string;
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  id?: string
}

export function DatePickerInput({
  value,
  onChange,
  placeholder = "MM/DD/YYYY hh:mm aa",
  label = "",
  className = "",
  id,
}: DatePickerInputProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <FormLabel htmlFor={id} className="ml-1">
          {label}
        </FormLabel>
      )}

      <DateTimePicker
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}