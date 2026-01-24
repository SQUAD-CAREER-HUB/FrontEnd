import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateTime(dateString: string | null | undefined): string {
  // null-safe 처리 (develop의 장점)
  if (!dateString) return '-';
  
  const date = new Date(dateString);
  
  // 잘못된 날짜 검증 (develop의 장점)
  if (isNaN(date.getTime())) return '-';
  
  // 상세한 포맷 지정 (feat-#25의 장점)
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
