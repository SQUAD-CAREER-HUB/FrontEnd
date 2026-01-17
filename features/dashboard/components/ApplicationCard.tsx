import { Clock, Send, ChevronRight } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface ApplicationCardProps {
  applicationId: number;
  company: string;
  position: string;
  deadline: string;
  applicationMethod: string;
  submissionStatus: string;
  /** 전형 단계 (예: 서류 전형, 1차 면접, 최종 면접 등) */
  stage?: string;
  /** 카드 클릭 시 호출되는 핸들러 */
  onClick?: (applicationId: number) => void;
  /** 푸터 액션 텍스트 (기본값: "상세 보기") */
  actionLabel?: string;
  /** 푸터 숨김 여부 */
  hideFooter?: boolean;
  /** 추가 className */
  className?: string;
}

export function ApplicationCard({
  applicationId,
  company,
  position,
  deadline,
  applicationMethod,
  submissionStatus,
  stage = '서류 전형',
  onClick,
  actionLabel = '상세 보기',
  hideFooter = false,
  className,
}: ApplicationCardProps) {
  // 날짜 포맷팅 로직 (예: 2025. 12. 31.)
  const dateObj = new Date(deadline);
  const formattedDate = dateObj.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  // D-Day 계산 로직
  const today = new Date();
  const diffTime = dateObj.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const dDayText =
    diffDays === 0 ? 'D-Day' : diffDays > 0 ? `D-${diffDays}` : '마감';

  const handleClick = () => {
    onClick?.(applicationId);
  };

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
      className={cn(
        'relative rounded-2xl p-6 border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between min-h-[220px]',
        className
      )}
    >
      <div className='flex flex-col h-full'>
        <div className='flex justify-between items-start mb-5'>
          <div className='pr-2 min-w-0'>
            <h3 className='text-lg font-bold text-slate-900 dark:text-slate-100 mb-1 truncate'>
              {company}
            </h3>
            <p className='text-slate-500 dark:text-slate-400 text-sm font-medium truncate'>
              {position}
            </p>
          </div>

          <div className='flex-shrink-0 flex items-center gap-1.5'>
            {/* 상태 텍스트에 따른 조건부 스타일링 */}
            <span
              className={cn(
                'text-[10px] font-bold px-1.5 py-0.5 rounded border transition-colors',
                submissionStatus === '마감 임박' &&
                  'text-red-500 bg-red-50 border-red-100 animate-pulse dark:bg-red-900/20 dark:border-red-900/50',
                submissionStatus === '미제출' &&
                  'text-slate-400 bg-slate-100 border-slate-200 dark:bg-slate-800 dark:border-slate-700',
                submissionStatus === '제출 완료' &&
                  'text-blue-600 bg-blue-50 border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/50'
              )}
            >
              {submissionStatus}
            </span>
            <span className='px-2.5 py-1 rounded-lg text-[11px] font-bold border bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800'>
              {stage}
            </span>
          </div>
        </div>

        <div className='flex-1'>
          <div className='flex flex-col gap-2.5 mt-2.5'>
            <div className='flex items-center text-[11px]'>
              <div className='w-5 flex-shrink-0 flex justify-center mr-2'>
                <Clock className='w-3.5 h-3.5 text-slate-400' />
              </div>
              <div className='flex items-center font-medium min-w-0'>
                <span className='text-slate-500 dark:text-slate-400 mr-1.5 flex-shrink-0'>
                  마감:
                </span>
                <span className='text-slate-700 dark:text-slate-200 opacity-80 truncate'>
                  {formattedDate}
                </span>
                <span
                  className={cn(
                    'flex-shrink-0 font-bold',
                    diffDays <= 7
                      ? 'ml-2 text-red-600 dark:text-red-400'
                      : 'text-brand-600 dark:text-brand-400'
                  )}
                >
                  {dDayText}
                </span>
              </div>
            </div>

            <div className='flex items-center text-[11px]'>
              <div className='w-5 flex-shrink-0 flex justify-center mr-2'>
                <Send className='w-3.5 h-3.5 text-slate-400' />
              </div>
              <div className='flex items-center font-medium text-slate-700 dark:text-slate-200'>
                <span className='text-slate-500 dark:text-slate-400 mr-1.5'>
                  방식:
                </span>
                {applicationMethod}
              </div>
            </div>
          </div>
        </div>
      </div>

      {!hideFooter && (
        <div className='mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end'>
          <span className='text-xs font-bold text-slate-400 group-hover:text-brand-500 transition-colors flex items-center'>
            {actionLabel} <ChevronRight className='w-3 h-3 ml-0.5' />
          </span>
        </div>
      )}
    </div>
  );
}
