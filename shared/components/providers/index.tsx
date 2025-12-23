import MswProvider from './MswProvider';
import TanstackQueryProvider from './TanstackQueryProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MswProvider>
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
      </MswProvider>
    </>
  );
}
