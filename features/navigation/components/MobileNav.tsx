'use client';

import {
  BookMarkedIcon,
  BriefcaseIcon,
  CalendarIcon,
  LayoutDashboardIcon,
  UsersIcon,
  LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/utils';

const NAV_ITEMS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: '/dashboard', label: '대시보드', icon: LayoutDashboardIcon },
  { href: '/applications', label: '지원 현황', icon: BriefcaseIcon },
  { href: '/calendar', label: '캘린더', icon: CalendarIcon },
  { href: '/questions', label: '면접 질문', icon: BookMarkedIcon },
  { href: '/community', label: '커뮤니티', icon: UsersIcon },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <div className='h-[60px] md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-30 pb-safe transition-colors'>
      <div className='flex justify-between items-center px-2'>
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center p-2 flex-1 space-y-1',
                isActive
                  ? 'text-brand-600 dark:text-brand-400'
                  : 'text-slate-400 dark:text-slate-500'
              )}
            >
              <Icon
                className={cn(
                  'w-6 h-6',
                  isActive && 'fill-brand-50 dark:fill-brand-900'
                )}
              />
              <span className='text-[10px] font-medium'>{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
