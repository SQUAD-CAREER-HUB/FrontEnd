'use client';

import { useEffect } from 'react';
import { initMsw } from '@/shared/lib/msw/initMsw';

export default function MswProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initMsw();
  }, []);

  return <>{children}</>;
}
