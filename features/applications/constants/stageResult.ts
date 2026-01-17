import { StageResult } from '../types/filter';

export const STAGE_RESULT_META: Record<
  StageResult,
  { label: string; styles: string }
> = {
  STAGE_PASS: {
    label: '전형 합격',
    styles: 'text-green-700 bg-green-50 border-green-200',
  },
  FINAL_PASS: {
    label: '최종 합격',
    styles: 'text-green-700 bg-green-50 border-green-200',
  },
  FINAL_FAIL: {
    label: '최종 불합격',
    styles: 'text-rose-700 bg-rose-50 border-rose-200',
  },
} as const;

export const STAGE_RESULT_OPTIONS: { label: string; value: StageResult }[] = [
  { label: '전형 합격', value: 'STAGE_PASS' },
  { label: '최종 합격', value: 'FINAL_PASS' },
  { label: '최종 불합격', value: 'FINAL_FAIL' },
];
