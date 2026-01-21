'use client';

import { UserIcon } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';

import { cn } from '@/shared/lib/utils';
import { useGetMyProfile } from '../hooks/useGetMyProfile';

interface MyProfileImageProps {
  className?: string;
  /** 업로드 시 보여줄 실시간 미리보기 URL (선택 사항) */
  previewUrl?: string | null;
}

export function MyProfileImage({ className, previewUrl }: MyProfileImageProps) {
  const { data: profile, isLoading } = useGetMyProfile();

  // 우선순위: 사용자가 방금 선택한 미리보기 > 서버에서 받아온 프로필 이미지
  const displayImage = previewUrl || profile?.profileImageUrl;
  // 닉네임 첫 글자 (없을 경우 기본 아이콘)
  const fallbackInitial = profile?.nickname?.charAt(0).toUpperCase();

  return (
    <Avatar
      className={cn('border border-slate-200 dark:border-slate-800', className)}
    >
      <AvatarImage
        src={displayImage || undefined}
        alt={profile?.nickname || '내 프로필 사진'}
        className='object-cover'
      />
      <AvatarFallback className='bg-slate-50 dark:bg-slate-900 text-slate-400'>
        {isLoading ? (
          // 로딩 중일 때 애니메이션
          <div className='w-full h-full animate-pulse bg-slate-200 dark:bg-slate-800' />
        ) : fallbackInitial ? (
          <span className='font-bold text-slate-600 dark:text-slate-300'>
            {fallbackInitial}
          </span>
        ) : (
          <UserIcon className='w-1/2 h-1/2' />
        )}
      </AvatarFallback>
    </Avatar>
  );
}
