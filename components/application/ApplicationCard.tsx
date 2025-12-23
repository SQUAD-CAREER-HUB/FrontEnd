// JobApplicationCard.tsx (React Component)
import { JobApplication } from '@/types';
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronRight, Clock, MapPin } from 'lucide-react';

interface JobApplicationCardProps {
  children?: React.ReactNode;
  data: JobApplication;
  onClick?: () => void;
}

const JobApplicationCard = ({ data, onClick }: JobApplicationCardProps) => {
  return (
    <Card
      className="relative rounded-2xl gap-6 p-5 border flex flex-col justify-between min-h-[180px] cursor-pointer group bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 shadow-sm hover:shadow-md transition-all duration-200"
      onClick={onClick}
    >
      <CardHeader className="flex justify-between items-start gap-0 px-0 mb-0">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1 
                         group-hover:text-brand-600 dark:group-hover:text-brand-400 
                         transition-colors line-clamp-1">
            {data.companyName}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-medium truncate">
            {data.position}
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 ml-4">
          <Badge
            variant="outline"
            className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded border 
              border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/50"
          >
            {data.currentStage}
          </Badge>
          <Badge
            variant="outline"
            className="px-2.5 py-1 rounded-lg text-[11px] font-bold border bg-orange-100 
              text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800"
          >
            면접전형
          </Badge>
        </div>
      </CardHeader>
      <CardContent className='flex-1 flex flex-col px-0'>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center text-xs font-bold text-slate-800 dark:text-slate-200'>
            <div className='w-5 flex justify-center mr-2'><Calendar className='w-3.5 h-3.5 text-slate-400' /></div>
            <span className='truncate'>2차 시스템 디자인</span>
          </div>
          <div className='flex items-center text-xs font-bold text-slate-800 dark:text-slate-200'>
            <div className='w-5 flex-shrink-0 flex justify-center mr-2'><Clock className='w-3.5 h-3.5 text-slate-400' /></div>
            <div className='flex items-center font-medium min-w-0'>
              <span className='text-slate-500 dark:text-slate-400 mr-1.5 flex-shrink-0'>
                다음 일정:
              </span>
              <span className='text-slate-700 dark:text-slate-200 truncate mr-2'>
                2025. 12. 24. 오후 02:00
              </span>
              <span className='flex-shrink-0 text-red-600 dark:text-red-400 font-bold'>
                D-2
              </span>
            </div>
          </div>
          <div className='flex items-center text-xs font-bold text-slate-800 dark:text-slate-200'>
            <div className='w-5 flex-shrink-0 flex justify-center mr-2'><MapPin className='w-3.5 h-3.5 text-slate-400' /></div>
            <div className='flex items-center font-medium min-w-0'>
              <span className='text-slate-700 dark:text-slate-200 truncate mr-2'>
                Google Meet
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className='mt-4 pt-3 px-0 border-t border-slate-100 dark:border-slate-800 flex justify-end'>
        <span className='text-xs font-bold text-slate-400 group-hover:text-brand-500 transition-colors flex items-center'>
          상세 보기<ChevronRight className='w-3 h-3 ml-0.5'/>
        </span>
      </CardFooter>
    </Card>
  );
};

export default JobApplicationCard;