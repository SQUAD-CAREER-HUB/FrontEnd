import MainSidebar from '@/features/navigation/components/MainSidebar';
import MobileFloatingActionButton from '@/features/navigation/components/MobileFloatingActionButton';
import MobileHeader from '@/features/navigation/components/MobileHeader';
import MobileNav from '@/features/navigation/components/MobileNav';
import FCMInitializer from '@/features/notifications/components/FCMInitializer';

import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

export default function Layout({ children, modal }: LayoutProps) {
  return (
    // 전체 화면을 꽉 채우는 컨테이너 (스크롤 방지)
    <div className='flex h-screen w-full overflow-hidden bg-white dark:bg-slate-950'>
      {/* FCM 푸시 알림 초기화 */}
      <FCMInitializer />

      {/* 사이드바 (데스크탑) */}
      <MainSidebar />

      {/* 메인 콘텐츠 영역 (세로로 헤더-본문-네비 순서 배치) */}
      <div className='flex flex-1 flex-col min-w-0 overflow-hidden'>
        {/* 모바일 상단 헤더 */}
        <MobileHeader />

        {/* 실제 스크롤이 일어나는 유일한 영역 */}
        <div className='flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900/50 pb-[60px] md:pb-0'>
          {children}
        </div>

        {/* 모바일 하단 플로팅 버튼 및 네비게이션 */}
        <MobileFloatingActionButton />
        <MobileNav />
      </div>

      {/* Parallel Route - Modal */}
      {modal}
    </div>
  );
}
