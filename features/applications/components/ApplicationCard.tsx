'use client';

import { Card, CardContent, CardFooter, CardHeader } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Calendar, ChevronRight, Clock, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ApplicationCard as ApplicationCardType } from '../hooks/useGetApplications';

interface ApplicationCardProps {
  data: ApplicationCardType;
}

// 지원 상태에 따른 배지 스타일
const getStatusStyle = (status: string) => {
  switch (status) {
    case 'FINAL_PASS':
      return 'text-blue-600 bg-blue-50 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/50';
    case 'FINAL_FAIL':
      return 'text-gray-600 bg-gray-50 border-gray-100 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-900/50';
    default: // IN_PROGRESS
      return 'text-orange-600 bg-orange-50 border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-900/50';
  }
};

// 지원 상태 라벨
const getStatusLabel = (status: string) => {
  switch (status) {
    case 'FINAL_PASS':
      return '최종 합격';
    case 'FINAL_FAIL':
      return '최종 탈락';
    default:
      return '진행중';
  }
};

// 현재 전형 결과에 따른 스타일
const getScheduleResultStyle = (result: string) => {
  switch (result) {
    case 'PASS':
      return 'text-green-600 bg-green-50 border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/50';
    case 'FAIL':
      return 'text-red-600 bg-red-50 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/50';
    default: // WAITING
      return 'text-yellow-600 bg-yellow-50 border-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-900/50';
  }
};

// 현재 전형 결과 라벨
const getScheduleResultLabel = (result: string) => {
  switch (result) {
    case 'PASS':
      return '합격';
    case 'FAIL':
      return '불합격';
    default:
      return '대기중';
  }
};

// 날짜 포맷팅
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const ApplicationCard = ({ data }: ApplicationCardProps) => {
  const router = useRouter();

  return (
    <Card
      className="relative rounded-2xl gap-6 p-5 border flex flex-col justify-between min-h-[180px] cursor-pointer group bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 shadow-sm hover:shadow-md transition-all duration-200"
      onClick={() => {
        router.push(`/applications/${data.applicationId}`);
      }}
    >
      <CardHeader className="flex justify-between items-start gap-0 px-0 mb-0">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1">
            {data.company}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-medium truncate">
            {data.position}
          </p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 ml-4">
          <Badge
            variant="outline"
            className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${getScheduleResultStyle(data.currentScheduleResult)}`}
          >
            {getScheduleResultLabel(data.currentScheduleResult)}
          </Badge>
          <Badge
            variant="outline"
            className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${getStatusStyle(data.applicationStatus)}`}
          >
            {getStatusLabel(data.applicationStatus)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col px-0">
        <div className="flex flex-col gap-2">
          {/* 현재 전형 단계 */}
          <div className="flex items-center text-xs font-bold text-slate-800 dark:text-slate-200">
            <div className="w-5 flex justify-center mr-2">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <span className="truncate">{data.currentStageType}</span>
          </div>

          {/* 서류 전형 정보 */}
          {data.docsStage && (
            <div className="flex items-center text-xs font-bold text-slate-800 dark:text-slate-200">
              <div className="w-5 flex-shrink-0 flex justify-center mr-2">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className="flex items-center font-medium min-w-0">
                <span className="text-slate-500 dark:text-slate-400 mr-1.5 flex-shrink-0">
                  마감:
                </span>
                <span className="text-slate-700 dark:text-slate-200 truncate">
                  {formatDate(data.docsStage.deadline)}
                </span>
              </div>
            </div>
          )}

          {/* 일정 전형 정보 */}
          {data.scheduleStage && (
            <>
              <div className="flex items-center text-xs font-bold text-slate-800 dark:text-slate-200">
                <div className="w-5 flex-shrink-0 flex justify-center mr-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="flex items-center font-medium min-w-0">
                  <span className="text-slate-500 dark:text-slate-400 mr-1.5 flex-shrink-0">
                    {data.scheduleStage.scheduleName}:
                  </span>
                  <span className="text-slate-700 dark:text-slate-200 truncate">
                    {formatDate(data.scheduleStage.nextScheduleAt)}
                  </span>
                </div>
              </div>
              {data.scheduleStage.location && (
                <div className="flex items-center text-xs font-bold text-slate-800 dark:text-slate-200">
                  <div className="w-5 flex-shrink-0 flex justify-center mr-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-200 truncate">
                    {data.scheduleStage.location}
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>

      <CardFooter className="mt-4 pt-3 px-0 border-t border-slate-100 dark:border-slate-800 flex justify-end">
        <span className="text-xs font-bold text-slate-400 group-hover:text-brand-500 transition-colors flex items-center">
          상세 보기
          <ChevronRight className="w-3 h-3 ml-0.5" />
        </span>
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
