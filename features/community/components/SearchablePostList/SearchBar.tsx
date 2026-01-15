'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  const [localValue, setLocalValue] = useState(value);

  // Debounce: 사용자가 입력을 멈추고 500ms 뒤에 부모의 onChange 실행
  useEffect(() => {
    const timer = setTimeout(() => {
      // 1. 공백 제거 후 비교
      // 2. 현재 URL의 쿼리와 로컬 입력값이 다를 때만 실행
      if (localValue.trim() !== value) {
        onChange(localValue);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [localValue, onChange, value]);

  // 부모(URL) 값이 외부에서 바뀌면(초기화 등) 로컬 값도 동기화
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <div className='relative flex-1'>
      <Search
        className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400'
        aria-hidden='true'
      />
      <input
        className='w-full pl-9 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors dark:text-slate-100 shadow-sm'
        placeholder='회사명, 직무, 면접 종류 검색...'
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
      />
    </div>
  );
}
