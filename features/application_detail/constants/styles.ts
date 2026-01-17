import { ScheduleResult } from "@/shared/types";

/**
 * Status별 배경 스타일 상수
 */
export const STATUS_BG_STYLES: Record<ScheduleResult, string> = {
  WAITING: 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800',
  PASS: 'bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800',
  FAIL: 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800',
};

/**
 * Status별 폰트 스타일 상수
 */
export const STATUS_FONT_STYLES: Record<ScheduleResult, string> = {
  WAITING: 'text-slate-900 dark:text-slate-100',
  PASS: 'text-green-800 dark:text-green-400',
  FAIL: 'text-red-800 dark:text-red-400',
};

/**
 * Active Stage 스타일 상수
 */
export const ACTIVE_STAGE_STYLES = {
  font: 'font-bold text-lg text-brand-600 dark:text-brand-400',
  bg: 'bg-brand-50/30 dark:bg-brand-900/10 border border-brand-100 dark:border-brand-900/50',
  border: 'border-brand-500 ring-2 ring-brand-100 shadow-md transform scale-[1.01] dark:bg-slate-900 dark:ring-brand-900/30 dark:bg-slate-900',
} as const;

/**
 * 공통 Label 스타일 상수
 */
export const LABEL_STYLES = {
  base: 'text-[10px] font-bold text-slate-400 uppercase tracking-widest',
  baseBlack: 'text-[10px] font-black text-slate-400 uppercase tracking-wider',
  required: 'text-red-500',
} as const;

/**
 * Status별 배경 클래스를 반환하는 유틸리티 함수
 */
export function getStatusBgClass(status: ScheduleResult): string {
  return STATUS_BG_STYLES[status];
}

/**
 * Status별 폰트 클래스를 반환하는 유틸리티 함수
 */
export function getStatusFontClass(status: ScheduleResult): string {
  return STATUS_FONT_STYLES[status];
}
