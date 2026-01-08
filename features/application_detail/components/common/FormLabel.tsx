import { Label } from "@/shared/components/ui/label";
import { LABEL_STYLES } from "../../constants/styles";
import { cn } from "@/shared/lib/utils";

interface FormLabelProps {
  htmlFor?: string;
  children: React.ReactNode;
  required?: boolean;
  variant?: 'base' | 'baseBlack';
  className?: string;
}

/**
 * 공통 Form Label 컴포넌트
 * 일관된 라벨 스타일을 제공합니다.
 */
export default function FormLabel({
  htmlFor,
  children,
  required = false,
  variant = 'base',
  className
}: FormLabelProps) {
  return (
    <Label
      htmlFor={htmlFor}
      className={cn(
        LABEL_STYLES[variant],
        'block mb-1',
        className
      )}
    >
      {children}
      {required && <span className={LABEL_STYLES.required}> *</span>}
    </Label>
  );
}
