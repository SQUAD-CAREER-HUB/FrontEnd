import { DocumentStatus } from '../_types/filter';

export const DOCUMENT_STATUS_META: Record<
  DocumentStatus,
  {
    label: string;
    color: string;
    bgColor: string;
    borderColor: string;
  }
> = {
  NOT_SUBMITTED: {
    label: '미제출',
    color: 'text-rose-700',
    bgColor: 'bg-rose-50',
    borderColor: 'bg-rose-200',
  },
  SUBMITTED: {
    label: '제출',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
} as const;

export const DOCUMENT_STATUS_OPTIONS = Object.entries(DOCUMENT_STATUS_META).map(
  ([value, meta]) => ({
    value,
    label: meta.label,
  })
);
