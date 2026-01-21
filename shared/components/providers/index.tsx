'use client';

import MswProvider from './MswProvider';
import { Toaster } from 'sonner';
import { ConfirmModal } from '../ConfirmModal';
import TanstackQueryProvider from './TanstackQueryProvider';
import ThemeProvider from './ThemeProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MswProvider>
        <TanstackQueryProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange // 테마 변경 시 잠깐의 트랜지션을 방지해서 더 깔끔하게 처리
          >
            <ConfirmModal />
            {children}
          </ThemeProvider>
        </TanstackQueryProvider>
      </MswProvider>
      <Toaster position="bottom-right" richColors closeButton />
    </>
  );
}