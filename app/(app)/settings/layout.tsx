import SettingsHeader from '@/features/settings/profile/components/SettingsHeader';
import { SettingsTabs } from '@/features/settings/components/SettingsTabs';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='p-4 md:p-8 max-w-4xl mx-auto'>
      <SettingsHeader />

      {/* 상단 탭 내비게이션 */}
      <nav className='mb-8'>
        <SettingsTabs />
      </nav>

      {/* 하단 콘텐츠 영역 */}
      <div className='animate-in fade-in slide-in-from-bottom-2 duration-500'>
        {children}
      </div>
    </div>
  );
}
