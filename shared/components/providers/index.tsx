'use client';

import MswProvider from './MswProvider';
import TanstackQueryProvider from './TanstackQueryProvider';
import { Toaster } from 'sonner';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MswProvider>
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
      </MswProvider>
      <Toaster position="bottom-right" richColors closeButton />
    </>
  );
}
