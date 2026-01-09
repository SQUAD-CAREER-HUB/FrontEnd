import LoginIntroSection from '@/features/login/components/LoginIntroSection';
import LoginActionSection from '@/features/login/components/LoginActionSection';

export const metadata = {
  title: '로그인 | career-hub',
  description: '계정에 로그인하여 서비스를 이용하세요.',
};

export default function LoginPage() {
  return (
    <>
      <LoginIntroSection />
      <LoginActionSection />
    </>
  );
}
