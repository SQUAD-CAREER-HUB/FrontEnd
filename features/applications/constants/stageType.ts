import { StageType } from '../types/filter';

export const STAGE_TYPE_META: Record<
  StageType,
  { label: string; styles: string }
> = {
  DOCUMENT: {
    label: '서류 전형',
    styles: 'text-blue-700 bg-blue-50 border-blue-200',
  },
  INTERVIEW: {
    label: '면접 전형',
    styles: 'text-orange-700 bg-orange-100 border-orange-200',
  },
  ETC: {
    label: '기타 전형',
    styles: 'text-indigo-700 bg-indigo-100 border-indigo-200',
  },
  CLOSE: {
    label: '지원 종료',
    styles: 'text-slate-700 bg-slate-100 border-slate-200',
  },
} as const;

export const STAGE_TYPE_OPTIONS: { label: string; value: StageType }[] = [
  { label: '서류 전형', value: 'DOCUMENT' },
  { label: '면접 전형', value: 'INTERVIEW' },
  { label: '기타 전형', value: 'ETC' },
  { label: '지원 종료', value: 'CLOSE' },
];
