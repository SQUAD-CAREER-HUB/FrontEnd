import { Button } from "@/shared/components/ui/button";
import { Pen } from "lucide-react";

interface StageEditButtonProps {
  onClick: () => void;
  className?: string;
}

/**
 * Stage 컴포넌트에서 사용하는 공통 Edit 버튼
 */
export default function StageEditButton({ onClick, className }: StageEditButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className={`p-1.5 text-slate-300 hover:text-brand-500 ${className || ''}`}
    >
      <Pen className="w-4 h-4" />
    </Button>
  );
}
