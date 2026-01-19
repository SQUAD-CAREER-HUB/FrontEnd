'use client';

import { usePathname, useRouter } from 'next/navigation';
import { UserIcon, BellRingIcon, MonitorIcon } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import Link from 'next/link';

const TAB_OPTIONS = [
  {
    id: 'profile',
    label: '프로필 설정',
    href: '/settings/profile',
    icon: UserIcon,
  },
  {
    id: 'notification',
    label: '알림 설정',
    href: '/settings/notification',
    icon: BellRingIcon,
  },
  {
    id: 'screen',
    label: '화면 설정',
    href: '/settings/screen',
    icon: MonitorIcon,
  },
];

export function SettingsTabs() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Tabs
      value={pathname}
      onValueChange={(value) => router.push(value)}
      className='mb-8'
    >
      <TabsList className='bg-slate-100 dark:bg-slate-800 p-1 rounded-xl h-auto flex-wrap justify-start w-fit'>
        {TAB_OPTIONS.map((tabOption) => (
          <TabsTrigger
            key={tabOption.id}
            value={tabOption.href}
            className='px-5 py-2.5 rounded-lg text-sm font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:text-brand-600 dark:data-[state=active]:text-brand-400 data-[state=active]:shadow-sm transition-all flex items-center'
            asChild
          >
            <Link
              href={tabOption.href}
              className='flex gap-x-2 items-center text-muted-foreground hover:text-accent-foreground'
            >
              <tabOption.icon className='w-4 h-4 stroke-[2.5]' />
              {tabOption.label}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
