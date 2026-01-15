'use client';

import { useState } from 'react';
import { CircleUserRoundIcon } from 'lucide-react';

import PostWriteTrigger from './PostWriteTrigger';
import PostWriteForm from './PostWriteForm';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import { cn } from '@/shared/lib/utils';
import { useGetMyProfile } from '@/features/navigation/hooks/useGetMyProfile';

export default function PostWriteSection() {
  const [isWritingMode, setIsWritingMode] = useState(false);
  const { data } = useGetMyProfile();

  return (
    <div className='transition-all duration-300 p-4 flex gap-x-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm'>
      <Avatar
        className={cn(
          'w-10 h-10 border border-slate-100 dark:border-slate-800'
        )}
      >
        <AvatarImage
          src={data?.profileImageUrl || ''}
          alt='Profile'
          className='object-cover'
        />
        <AvatarFallback className='bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400'>
          <CircleUserRoundIcon className='w-8 h-8' />
        </AvatarFallback>
      </Avatar>

      {!isWritingMode ? (
        <PostWriteTrigger onClick={() => setIsWritingMode(true)} />
      ) : (
        <PostWriteForm onClose={() => setIsWritingMode(false)} />
      )}
    </div>
  );
}
