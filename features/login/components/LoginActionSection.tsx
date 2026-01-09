'use client';

import GoogleIcon from '@/assets/GoogleIcon';
import KakaoIcon from '@/assets/KakaoIcon';
import { Button } from '@/shared/components/ui/button';
import { ArrowLeftIcon, ShieldCheckIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/assets/career-hub-logo.png';
import { ENV } from '@/shared/constants/env';
import { useState } from 'react';

export default function LoginActionSection() {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleSocialLogin = async (provider: 'google' | 'kakao') => {
    setIsRedirecting(true);
    window.location.assign(
      `${ENV.BACKEND_API_URL}/oauth2/authorization/${provider}`
    );
  };

  return (
    <section className='flex-1 flex flex-col items-center justify-center p-8 md:p-12 lg:p-20 bg-slate-50 dark:bg-slate-950 relative'>
      <div className='lg:hidden absolute top-8 left-8 flex items-center gap-2 cursor-pointer'>
        <Link href='/'>
          <Image
            src={Logo}
            alt='career-hub logo'
            className='object-cover w-40'
            priority
          />
        </Link>
      </div>

      <div className='w-full max-w-[420px] animate-fade-in-up'>
        <div className='mb-10 space-y-2'>
          <p className='text-3xl font-black text-slate-900 dark:text-white tracking-tight'>
            반가워요! 👋
          </p>

          <p className='text-slate-500 dark:text-slate-400 font-medium text-lg'>
            소셜 계정으로 1초 만에 시작하세요
          </p>
        </div>

        <div className='flex flex-col gap-y-4 mb-10'>
          <Button
            disabled={isRedirecting}
            variant='outline'
            className='py-4 px-6 h-12 rounded-2xl shadow-sm transition-all hover:-translate-y-1.5'
            onClick={() => handleSocialLogin('google')}
          >
            <GoogleIcon />
            <span className='text-sm font-bold text-slate-700 dark:text-slate-200'>
              Google 계정으로 로그인
            </span>
          </Button>
          <Button
            disabled={isRedirecting}
            variant='outline'
            className='py-4 px-6 h-12 rounded-2xl bg-[#FEE500] hover:bg-[#FDD835] hover:-translate-y-1.5 shadow-sm transition-all'
            onClick={() => handleSocialLogin('kakao')}
          >
            <KakaoIcon />
            <span className='text-sm font-bold text-slate-700'>
              카카오톡으로 로그인
            </span>
          </Button>

          <Button
            asChild
            variant='link'
            className='text-sm font-bold text-slate-400 hover:text-brand-500 flex items-center transition-colors hover:no-underline group'
          >
            <Link href='/'>
              <ArrowLeftIcon className='w-6 h-6 group-hover:-translate-x-2 transition-transform' />
              랜딩 페이지로 돌아가기
            </Link>
          </Button>
        </div>

        <div className='border-t border-border flex flex-col'>
          <div className='mt-4 flex items-center justify-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4'>
            <ShieldCheckIcon className='w-5 h-5 stroke-2' /> SECURE
            AUTHENTICATION
          </div>
          <div className='text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed px-4'>
            로그인 시 커리어허브의 이용약관 및 개인정보처리방침에 동의하는
            것으로 간주됩니다.
          </div>
        </div>
      </div>
    </section>
  );
}
