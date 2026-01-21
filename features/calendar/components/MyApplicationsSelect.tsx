'use client';

import { useQuery } from '@tanstack/react-query';
import { FieldError } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Label } from '@/shared/components/ui/label';

/** 지원 내역 요약 타입 */
interface ApplicationSummary {
  applicationId: number;
  companyName: string;
}

const DUMMY_APPLICATIONS: ApplicationSummary[] = [
  { applicationId: 101, companyName: '버킷플레이스 (오늘의집)' },
  { applicationId: 102, companyName: '카카오' },
  { applicationId: 103, companyName: '네이버' },
  { applicationId: 104, companyName: '쿠팡' },
  { applicationId: 105, companyName: '라인플러스' },
];

interface MyApplicationsSelectProps {
  // any를 사용하여 여러 타입의 폼에서 재사용 가능하게 설정
  onValueChange: (value: string) => void;
  error?: FieldError;
}

export default function MyApplicationsSelect({
  onValueChange,
  error,
}: MyApplicationsSelectProps) {
  // 지원 중인 기업 목록 조회
  const { data: applications, isLoading } = useQuery({
    queryKey: ['my-applications-summary'],
    queryFn: async () => {
      // 실제 API 연동 시 아래 주석 해제
      // const response = await clientApi.get<ApplicationSummary[]>('/v1/applications/summary');
      // return response.data;
      return Promise.resolve(DUMMY_APPLICATIONS);
    },
  });

  return (
    <div className='flex flex-col gap-y-2'>
      <Label className='font-black'>대상 기업</Label>

      <Select disabled={isLoading} onValueChange={onValueChange}>
        <SelectTrigger className='w-full'>
          <SelectValue
            placeholder={
              isLoading ? '기업 목록을 불러오는 중...' : '회사를 선택해주세요.'
            }
          />
        </SelectTrigger>
        <SelectContent>
          {applications?.map((app) => (
            <SelectItem
              key={app.applicationId}
              value={app.applicationId.toString()}
            >
              {app.companyName}
            </SelectItem>
          ))}
          {applications?.length === 0 && (
            <div className='p-2 text-sm text-muted-foreground text-center'>
              지원 중인 공고가 없습니다.
            </div>
          )}
        </SelectContent>
      </Select>

      {error && <p className='text-xs text-red-500'>{error.message}</p>}
    </div>
  );
}
