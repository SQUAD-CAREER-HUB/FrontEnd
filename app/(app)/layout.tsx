import MainSidebar from '@/features/navigation/components/MainSidebar';
import MobileFloatingActionButton from '@/features/navigation/components/MobileFloatingActionButton';
import MobileHeader from '@/features/navigation/components/MobileHeader';
import MobileNav from '@/features/navigation/components/MobileNav';

import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      {/* 사이드바 (데스크탑 전용) */}
      <MainSidebar />
      {/* 모바일 전용 UI (고정 요소들) */}
      <MobileHeader />
      <MobileFloatingActionButton />
      <MobileNav />

      <div className='flex-1 min-h-full bg-slate-50 dark:bg-slate-900/50 pb-[60px] md:pb-0'>
        {children}
      </div>
    </div>
  );
}
