import { Button } from '@/shared/components/ui/button';

export default function PostWriteTrigger({ onClick }: { onClick: () => void }) {
  return (
    <div className='flex-1'>
      <Button
        variant='ghost'
        type='button'
        onClick={onClick}
        className='justify-start w-full py-2.5 px-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400 text-left text-sm transition-colors'
      >
        오늘 면접은 어떠셨나요? 후기를 공유해주세요...
      </Button>
    </div>
  );
}
