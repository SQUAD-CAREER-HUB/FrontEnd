import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import { EllipsisIcon, LogOutIcon } from 'lucide-react';
import { useGetMyProfile } from '../../hooks/useGetMyProfile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { cn } from '@/shared/lib/utils';

interface SidebarProfileDropdownMenuProps {
  isExpanded: boolean;
}

export const SidebarProfileDropdownMenu = ({
  isExpanded,
}: SidebarProfileDropdownMenuProps) => {
  const { data } = useGetMyProfile();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='w-full p-2 flex h-auto gap-3'>
          <Avatar className='size-9 shrink-0'>
            <AvatarImage src='https://github.com/maxleiter.png' />
            <AvatarFallback>{data?.nickname?.[0] || 'U'}</AvatarFallback>
          </Avatar>

          {isExpanded && (
            <>
              <div className='flex-1 text-left overflow-hidden'>
                <p className='text-sm font-bold text-slate-900 dark:text-white truncate'>
                  {data?.nickname}님
                </p>
              </div>
              <EllipsisIcon className='w-4 h-4 shrink-0 text-slate-400' />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='ml-4 w-52'>
        {!isExpanded && (
          <>
            <DropdownMenuLabel>
              <p>{data?.nickname}</p>님 안녕하세요.
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem
          className={cn(
            'cursor-pointer px-4 py-2.5 text-sm text-red-500 font-medium',
            'hover:bg-red-50 transition-colors focus:bg-red-50 focus:text-red-500'
          )}
        >
          <LogOutIcon className='w-4 h-4 text-red-500' />
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
