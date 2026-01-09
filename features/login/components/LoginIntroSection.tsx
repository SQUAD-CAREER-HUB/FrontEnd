import Logo from '@/assets/career-hub-logo.png';
import { SparklesIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginIntroSection() {
  return (
    <section className='hidden lg:flex lg:w-[45%] xl:w-[40%] relative flex-col p-12 xl:p-16 overflow-hidden bg-brand-600'>
      <div className='mb-40'>
        <Link href='/'>
          <Image
            src={Logo}
            alt='career-hub logo'
            className='object-cover w-40'
          />
        </Link>
      </div>

      <div className='space-y-4 max-w-sm'>
        <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest'>
          <SparklesIcon className='w-3 h-3 text-cyan-300' />
          All-in-One Career Tool
        </div>

        <div className='text-4xl xl:text-5xl font-black text-white leading-tight'>
          흩어져 있는 <br /> 지원 정보를 <br />{' '}
          <span className='text-cyan-300'>한 곳에.</span>
        </div>

        <div className='text-brand-100 text-lg font-medium leading-relaxed'>
          복잡한 엑셀 관리에서 벗어나세요. <br />
          당신만을 위한 스마트한 커리어 비서.
        </div>
      </div>

      <div></div>
    </section>
  );
}
