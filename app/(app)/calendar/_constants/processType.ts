import { ProcessType } from '../_types/filter';

export const PROCESS_TYPE_META: Record<
  ProcessType,
  { label: string; color: string; bgColor: string; borderColor: string }
> = {
  DOCUMENT: {
    label: '서류 전형',
    color: 'text-blue-500',
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-500',
  },
  INTERVIEW: {
    label: '면접 전형',
    color: 'text-green-500',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-500',
  },
  ETC: {
    label: '기타 전형',
    color: 'text-purple-500',
    bgColor: 'bg-purple-100',
    borderColor: 'border-purple-500',
  },
};

export const PROCESS_TYPE_OPTIONS: { label: string; value: ProcessType }[] = [
  { label: '서류 전형', value: 'DOCUMENT' },
  { label: '면접 전형', value: 'INTERVIEW' },
  { label: '기타 전형', value: 'ETC' },
];
