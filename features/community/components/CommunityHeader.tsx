import { UsersIcon } from 'lucide-react';

export default function CommunityHeader() {
  return (
    <div className='mb-8'>
      <div className='flex items-center gap-x-2'>
        <UsersIcon className='size-5 text-brand-500 stroke-2' />
        <h1 className='text-2xl font-bold text-slate-900 dark:text-slate-100 transition-colors'>
          면접 커뮤니티
        </h1>
      </div>

      <p className='text-base font-semibold text-slate-500 dark:text-slate-400 mt-1 transition-colors'>
        생생한 면접 후기와 기출 질문을 공유해보세요.
      </p>
    </div>
  );
}
