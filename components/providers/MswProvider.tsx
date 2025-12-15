'use client';

import { useEffect } from 'react';
import { initMsw } from '@/lib/msw/initMsw';

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
