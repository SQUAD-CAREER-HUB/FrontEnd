import { Button } from '@/shared/components/ui/button';
import { ButtonGroup } from '@/shared/components/ui/button-group';
import { BriefcaseIcon, ChartColumnIcon, ChevronRightIcon } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className='p-4'>
      <div>
        <p className='text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight transition-colors'>
          안녕하세요, 구직자님 👋
        </p>
        <p className='text-slate-500 dark:text-slate-400 mt-1 transition-colors'>
          오늘도 성공적인 커리어 여정을 응원합니다.
        </p>
      </div>

      {/* kpi 지원 현황 통계 조회 */}
      <div></div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2 space-y-10'>
          <div>
            <div className='flex items-center justify-between'>
              <div className='text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2'>
                <BriefcaseIcon className='w-5 h-5 text-brand-500' />
                <span>진행중인 서류 전형</span>
              </div>
              <Button
                variant='link'
                className='text-brand-500 text-sm font-bold'
              >
                더보기
                <ChevronRightIcon className='w-4 h-4' />
              </Button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
              지원 카드 4개 자리
            </div>
          </div>

          {/* 지원 활동 분석 차트 */}
          <div className='bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden transition-colors'>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4'>
              <div>
                <p className='text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center'>
                  <ChartColumnIcon className='w-5 h-5 text-brand-500 mr-2' />
                  지원 활동 분석
                </p>
                <p className='text-sm text-slate-400 dark:text-slate-500 mt-1'>
                  최근 생성된 지원 카드 트렌드입니다.
                </p>
              </div>

              <ButtonGroup className='bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl flex text-xs font-bold self-start sm:self-center'>
                <Button
                  variant='ghost'
                  // className='px-4 py-2 rounded-lg transition-all bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm'
                >
                  주간
                </Button>
                <Button
                  variant='ghost'
                  // className='px-4 py-2 rounded-lg transition-all bg-whit text-slate-500 dark:text-slate-400 hover:text-slate-700'
                >
                  월간
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </div>

        <div className='space-y-8'></div>
      </div>
    </div>
  );
}
