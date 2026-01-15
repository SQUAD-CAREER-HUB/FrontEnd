'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { SortOrder } from '../../types';

interface Props {
  value: SortOrder;
  onChange: (val: SortOrder) => void;
}

const SORT_OPTIONS: { label: string; value: SortOrder }[] = [
  { label: '최신순', value: 'NEWEST' },
  { label: '오래된순', value: 'OLDEST' },
];

export default function SortDropdown({ value, onChange }: Props) {
  const handleValueChange = (newValue: string) => {
    const nextValue = newValue as SortOrder;

    if (nextValue !== value) {
      onChange(nextValue);
    }
  };

  return (
    <div className='min-w-[140px]'>
      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger className='w-full h-full py-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 shadow-sm focus:ring-brand-500'>
          <SelectValue placeholder='정렬 선택' />
        </SelectTrigger>
        <SelectContent className='bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl shadow-lg'>
          {SORT_OPTIONS.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className='focus:bg-slate-100 dark:focus:bg-slate-800 cursor-pointer'
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
