import { Clock } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/shared/lib/utils";

interface DateTimeInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  id?: string;
  required?: boolean;
  error?: string;
  showIcon?: boolean;
  className?: string;
}

export function DateTimeInput({ value, onChange, label, id, required, error, showIcon = true, className }: DateTimeInputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <Label htmlFor={id} className="text-[10px] text-slate-400 font-bold uppercase tracking-wider ml-1">
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </Label>
      )}
      <div className="relative">
        {showIcon && (
          <Clock
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 z-10 pointer-events-none"
            aria-hidden="true"
          />
        )}
        <Input
          id={id}
          type="datetime-local"
          value={value ? value.slice(0, 16) : ''}
          onChange={(e) => onChange(e.target.value ? `${e.target.value}:00` : '')}
          className={cn(
            showIcon && "pl-8",
            className
          )}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1 ml-1">{error}</p>}
    </div>
  );
}
