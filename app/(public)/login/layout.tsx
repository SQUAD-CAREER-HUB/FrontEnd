import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className='min-h-screen flex flex-col md:flex-row bg-white dark:bg-slate-950 overflow-hidden'>
      {children}
    </div>
  );
}
