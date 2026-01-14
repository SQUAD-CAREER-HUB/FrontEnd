import { SubmissionStatus } from '../types/filter';

export const SUBMISSION_STATUS_META: Record<
  SubmissionStatus,
  { label: string; styles: string }
> = {
  NOT_SUBMITTED: {
    label: '미제출',
    styles: 'text-rose-700 bg-rose-50 border-rose-200',
  },
  SUBMITTED: {
    label: '제출',
    styles: 'text-blue-700 bg-blue-50 border-blue-200',
  },
} as const;

export const SUBMISSION_STATUS_OPTIONS: {
  label: string;
  value: SubmissionStatus;
}[] = [
  { label: '미제출', value: 'NOT_SUBMITTED' },
  { label: '제출', value: 'SUBMITTED' },
];
