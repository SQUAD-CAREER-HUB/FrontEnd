import { ResultStatus } from '../_types/filter';

export const RESULT_STATUS_META: Record<
  ResultStatus,
  { label: string; color: string; bgColor: string }
> = {
  PROCESS_PASS: {
    label: '전형 합격',
    color: 'bg-green-500',
    bgColor: 'bg-green-100',
  },
  FINAL_FAIL: {
    label: '최종 합격',
    color: 'bg-green-500',
    bgColor: 'bg-green-100',
  },
  FINAL_PASS: {
    label: '최종 불합격',
    color: 'bg-red-500',
    bgColor: 'bg-red-100',
  },
};

export const RESULT_STATUS_OPTIONS: { label: string; value: ResultStatus }[] = [
  { label: '전형 합격', value: 'PROCESS_PASS' },
  { label: '최종 합격', value: 'FINAL_PASS' },
  { label: '최종 불합격', value: 'FINAL_FAIL' },
];
