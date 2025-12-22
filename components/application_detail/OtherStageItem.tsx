'use client'
import { Clock } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import StatusButtonGroup from "./StatusButtonGroup";

interface OtherStageItemProps {
  title: string;
  datetime: string;
  onStatusChange?: (status: 'pending' | 'passed' | 'failed') => void;
}

// 5. 기타 전형 아이템 컴포넌트
export default function OtherStageItem({ 
  title, 
  datetime, 
  onStatusChange 
}: OtherStageItemProps) {
  return (
    <Card className='p-4 rounded-xl shadow-sm transition-all group relative overflow-hidden bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800'>
      <CardContent className='px-0'>
        <div className='flex justify-between items-start mb-2'>
          <div>
            <h4 className='font-bold text-green-800 dark:text-green-400'>{title}</h4>
          </div>
          <StatusButtonGroup onStatusChange={onStatusChange} />
        </div>
        <div className='flex items-center text-xs text-slate-500 dark:text-slate-400 mt-1'>
          <Clock className='w-3.5 h-3.5 mr-1.5' />
          {datetime}
        </div>
      </CardContent>
    </Card>
  );
}