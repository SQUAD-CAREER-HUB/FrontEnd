import { BellIcon, SettingsIcon } from 'lucide-react';
import Logo from '@/assets/career-hub-logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';

export default function MobileHeader() {
  return (
    <header className='w-full md:hidden h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sticky top-0 z-30 shrink-0 transition-colors'>
      <div className='flex items-center space-x-2'>
        <Link href='/'>
          <Image src={Logo} alt='CareerHub Logo' className='h-8 w-auto' />
        </Link>
      </div>
      <div className='flex items-center space-x-2'>
        <Popover>
          <PopoverTrigger asChild>
            <button className='relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors'>
              <BellIcon className='w-5 h-5' />
              {/* 알림 배지 */}
              <span className='absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white'></span>
            </button>
          </PopoverTrigger>
          {/* align="end"를 주어 버튼 우측 끝에 맞춤 */}
          <PopoverContent className='w-80 mr-4' align='end'>
            {/* <NotificationList /> */}
          </PopoverContent>
        </Popover>

        <Button
          variant='ghost'
          asChild
          size='icon'
          className='p-2 text-slate-600 dark:text-slate-400'
        >
          <Link href='/settings'>
            <SettingsIcon className='w-5 h-5' />
          </Link>
        </Button>
      </div>
    </header>
  );
}
