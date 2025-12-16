import { ProcessType } from '../_types/filter';

export const PROCESS_TYPE_META: Record<
  ProcessType,
  { label: string; color: string; bgColor: string; borderColor: string }
> = {
  DOCUMENT: {
    label: '서류 전형',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  INTERVIEW: {
    label: '면접 전형',
    color: 'text-orange-700',
    bgColor: 'bg-orange-100',
    borderColor: 'border-orange-200',
  },
  ETC: {
    label: '기타 전형',
    color: 'text-indigo-700',
    bgColor: 'bg-indigo-100',
    borderColor: 'border-indigo-200',
  },
} as const;

export const PROCESS_TYPE_OPTIONS: { label: string; value: ProcessType }[] = [
  { label: '서류 전형', value: 'DOCUMENT' },
  { label: '면접 전형', value: 'INTERVIEW' },
  { label: '기타 전형', value: 'ETC' },
];
