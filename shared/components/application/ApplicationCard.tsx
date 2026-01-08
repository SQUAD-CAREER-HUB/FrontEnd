// JobApplicationCard.tsx (React Component)
import { JobApplication } from '@/shared/types';
import React from 'react';
import { Card, CardHeader } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';

interface JobApplicationCardProps {
  children?: React.ReactNode;
  data: JobApplication;
  onClick?: () => void;
}

const JobApplicationCard = ({ data, onClick }: JobApplicationCardProps) => {
  return (
    <Card
      className="relative rounded-2xl p-5 border flex flex-col justify-between min-h-[180px] cursor-pointer group bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 shadow-sm hover:shadow-md transition-all duration-200"
      onClick={onClick}
    >
      <CardHeader className="flex justify-between items-start min-h-[180px] gap-0 px-0 mb-0">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1 
                         group-hover:text-brand-600 dark:group-hover:text-brand-400 
                         transition-colors line-clamp-1">
              {data.companyName}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {data.position}
            </p>
          </div>
          
          <div className="flex items-end gap-1.5 shrink-0 ml-4">
            <Badge 
              variant="outline" 
              className="bg-orange-100 text-orange-700 border-orange-200 
                       dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800
                       text-[10.5px] font-bold"
            >
              면접전형
            </Badge>
            <Badge 
              variant="outline"
              className="bg-green-50 text-green-600 border-green-200 
                       dark:bg-green-900/30 dark:text-green-400 dark:border-green-800
                       text-[10px] font-bold"
            >
              {data.currentStage}
            </Badge>
          </div>
      </CardHeader>
    </Card>
  );
};

export default JobApplicationCard;