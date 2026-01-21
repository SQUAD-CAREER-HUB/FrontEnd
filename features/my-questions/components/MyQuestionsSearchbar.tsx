'use client';

import { SearchIcon } from 'lucide-react';
import { useState } from 'react';

export default function MyQuestionsSearchbar() {
  const [search, setSearch] = useState('');

  return (
    <div className='mb-6 relative'>
      <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400' />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='w-full pl-9 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none dark:text-slate-100'
        placeholder='회사명으로 검색...'
      />
    </div>
  );
}
