import { DocumentStatus } from '../_types/filter';

export const DOCUMENT_STATUS_META: Record<
  DocumentStatus,
  {
    label: string;
    color: string;
    bgColor: string;
  }
> = {
  NOT_SUBMITTED: {
    label: '미제출',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  SUBMITTED: {
    label: '제출',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
};

export const DOCUMENT_STATUS_OPTIONS = Object.entries(DOCUMENT_STATUS_META).map(
  ([value, meta]) => ({
    value,
    label: meta.label,
  })
);
