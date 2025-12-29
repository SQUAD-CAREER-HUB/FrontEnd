import MainSidebar from '@/features/navigation/components/MainSidebar';
import MobileFloatingActionButton from '@/features/navigation/components/MobileFloatingActionButton';
import MobileHeader from '@/features/navigation/components/MobileHeader';
import MobileNav from '@/features/navigation/components/MobileNav';

import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <MobileHeader />
      <MobileFloatingActionButton />
      <MobileNav />
      <div className='flex h-screen overflow-hidden bg-white dark:bg-slate-950'>
        <MainSidebar />

        {/* 메인 컨텐츠 영역 */}
        <div className='flex-1 bg-slate-50'>{children}</div>
      </div>
    </div>
  );
}
