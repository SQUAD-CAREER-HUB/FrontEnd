import MainSidebar from '@/features/navigation/components/MainSidebar';
import MobileFloatingActionButton from '@/features/navigation/components/MobileFloatingActionButton';
import MobileHeader from '@/features/navigation/components/MobileHeader';
import MobileNav from '@/features/navigation/components/MobileNav';

import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    // 전체 화면을 꽉 채우는 컨테이너 (스크롤 방지)
    <div className='flex bg-white dark:bg-slate-950'>
      {/* 사이드바 (데스크탑) */}
      <MainSidebar />

      {/* 메인 콘텐츠 영역 (세로로 헤더-본문-네비 순서 배치) */}
      <div className='flex-1 flex flex-col'>
        {/* 모바일 상단 헤더 */}
        <MobileHeader />

        {/* 실제 스크롤이 일어나는 유일한 영역 */}
        <div className='flex-1 bg-slate-50 dark:bg-slate-900/50'>
          {children}
        </div>

        {/* 모바일 하단 플로팅 버튼 및 네비게이션 */}
        <MobileFloatingActionButton />
        <MobileNav />
      </div>
    </div>
  );
}
