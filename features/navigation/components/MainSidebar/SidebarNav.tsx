'use client';

import { usePathname } from 'next/navigation';
import { SidebarNavItem } from './SidebarNavItem';
import { MENU_GROUPS } from '../../constants';

interface SidebarNavProps {
  isExpanded: boolean;
}

export function SidebarNav({ isExpanded }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <div className='flex-1 overflow-y-auto space-y-6 scrollbar-hide'>
      {MENU_GROUPS.map((group) => (
        <div key={group.group}>
          {isExpanded && (
            <p className='text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-1'>
              {group.group}
            </p>
          )}
          <nav className='space-y-1'>
            {group.items.map((item) => (
              <SidebarNavItem
                key={item.href}
                {...item}
                isActive={pathname === item.href}
                isExpanded={isExpanded}
              />
            ))}
          </nav>
        </div>
      ))}
    </div>
  );
}
