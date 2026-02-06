import { clientApi } from '@/shared/lib/api/clientApi';

export interface DailyApplication {
  applicationId: number;
  company: string;
  position: string;
  currentStageType: string;
  applicationStatus: 'IN_PROGRESS' | 'FINAL_PASS' | 'FINAL_FAIL';
  currentScheduleResult: 'PASS' | 'FAIL' | 'WAITING';
  docsStage?: {
    deadline: string;
    applicationMethod: string;
  };
  scheduleStage: {
    scheduleName: string;
    location: string;
    nextScheduleAt: string;
  };
}

export function getApplicationsByDate(targetDate: string) {
  return clientApi.get<DailyApplication[]>(
    `/v1/schedules/date?targetDate=${targetDate}`,
  );
}
