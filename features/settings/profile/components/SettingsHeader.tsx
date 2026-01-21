import { SettingsIcon } from 'lucide-react';

export default function SettingsHeader() {
  return (
    <header className='mb-8'>
      <div className='flex items-center gap-x-2 mb-2'>
        <SettingsIcon className='w-6 h-6 text-primary stroke-2' />
        <h1 className='text-2xl font-bold text-slate-900 dark:text-slate-100'>
          계정 설정
        </h1>
      </div>

      <p className='text-slate-500 dark:text-slate-400 mb-8'>
        프로필 정보, 알림, 화면 테마를 설정하세요.
      </p>
    </header>
  );
}
