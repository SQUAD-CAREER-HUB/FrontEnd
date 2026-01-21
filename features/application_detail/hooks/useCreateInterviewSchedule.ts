import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/shared/lib/api/clientApi';
import {
  InterviewScheduleRequest,
  ScheduleResponse,
  ApplicationDetailResponse,
  InterviewStageTimeLine,
} from '../types';
import { applicationDetailKeys } from './useGetApplicationDetail';

export function useCreateInterviewSchedule(applicationId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: InterviewScheduleRequest) => {
      return clientApi.post<ScheduleResponse>(
        `/v1/applications/${applicationId}/schedules/interview`,
        data
      );
    },
    onSuccess: (newSchedule) => {
      queryClient.setQueryData(
        applicationDetailKeys.detail(applicationId),
        (oldData: ApplicationDetailResponse | undefined) => {
          if (!oldData) return oldData;

          const newInterviewTimeline: InterviewStageTimeLine = {
            stageId: newSchedule.id,
            scheduleId: newSchedule.id,
            scheduleName: newSchedule.scheduleName,
            scheduleResult: newSchedule.scheduleResult,
            location: newSchedule.location,
            startedAt: newSchedule.startedAt,
          };

          return {
            ...oldData,
            applicationStageTimeLine: {
              ...oldData.applicationStageTimeLine,
              interviewStageTimeLine: [
                ...oldData.applicationStageTimeLine.interviewStageTimeLine,
                newInterviewTimeline,
              ],
            },
          };
        }
      );
    },
  });
}
