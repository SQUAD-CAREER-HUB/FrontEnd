'use client';

import { useGetMyProfile } from '@/features/navigation/hooks/useGetMyProfile';
import { differenceInDays, parseISO } from 'date-fns';

export default function DashboardHeader() {
  const { data } = useGetMyProfile();

  // 가입일수 계산 (가입한 날을 1일로 포함하려면 +1)
  const daysSinceJoined = data?.createdAt
    ? differenceInDays(new Date(), parseISO(data.createdAt)) + 1
    : 0;

  return (
    <div>
      <p className='text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight transition-colors'>
        안녕하세요, <span className='text-primary'>{data?.nickname}</span> 님 👋
      </p>
      <p className='text-slate-500 dark:text-slate-400 transition-colors'>
        CareerHub와 함께하신지{' '}
        {data?.createdAt && (
          <span className='font-bold text-primary dark:text-slate-200'>
            {daysSinceJoined}일
          </span>
        )}{' '}
        됐어요!
      </p>
    </div>
  );
}
