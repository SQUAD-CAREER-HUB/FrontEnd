'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { SortOrder } from '@/features/community/types';
import SearchBar from './SearchBar';
import SortDropdown from './SortDropdown';
import PostList from './PostList';

export default function SearchablePostList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const query = searchParams.get('query') || '';
  const sort = (searchParams.get('sort') || 'NEWEST') as SortOrder;

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      // 2. 변경된 값 적용
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      // 3. 필터 변경 시 첫 페이지부터 다시 보여주기 위해 page 파라미터가 있다면 삭제
      if (params.has('page')) params.delete('page');

      // 4. URL 업데이트 (shallow routing 효과)
      // scroll: false를 주면 필터 변경 시 페이지 최상단으로 튕기는 것을 방지합니다.
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row gap-4'>
        <SearchBar value={query} onChange={(v) => updateFilter('query', v)} />
        <SortDropdown value={sort} onChange={(v) => updateFilter('sort', v)} />
      </div>

      <PostList query={query} sort={sort} />
    </div>
  );
}
