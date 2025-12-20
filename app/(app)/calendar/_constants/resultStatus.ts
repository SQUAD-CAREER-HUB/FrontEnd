import { ResultStatus } from '../_types/filter';

export const RESULT_STATUS_META: Record<
  ResultStatus,
  { label: string; styles: string }
> = {
  PROCESS_PASS: {
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

export const RESULT_STATUS_OPTIONS: { label: string; value: ResultStatus }[] = [
  { label: '전형 합격', value: 'PROCESS_PASS' },
  { label: '최종 합격', value: 'FINAL_PASS' },
  { label: '최종 불합격', value: 'FINAL_FAIL' },
];
