import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/shared/lib/api/clientApi';
import {
  InterviewScheduleRequest,
  ScheduleResponse,
  ApplicationDetailResponse,
} from '../types';
import { applicationDetailKeys } from './useGetApplicationDetail';

export function useUpdateInterviewSchedule(applicationId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      scheduleId,
      data,
    }: {
      scheduleId: number;
      data: InterviewScheduleRequest;
    }) => {
      return clientApi.put<ScheduleResponse>(
        `/v1/applications/${applicationId}/schedules/interview/${scheduleId}`,
        data
      );
    },
    onSuccess: (updatedSchedule) => {
      console.log(updatedSchedule);
      queryClient.setQueryData(
        applicationDetailKeys.detail(applicationId),
        (oldData: ApplicationDetailResponse | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            applicationStageTimeLine: {
              ...oldData.applicationStageTimeLine,
              interviewStageTimeLine:
                oldData.applicationStageTimeLine.interviewStageTimeLine.map(
                  (schedule) =>
                    schedule.scheduleId === updatedSchedule.id
                      ? {
                          stageId: schedule.stageId,
                          scheduleId: updatedSchedule.id,
                          scheduleName: updatedSchedule.scheduleName,
                          scheduleResult: updatedSchedule.scheduleResult,
                          location: updatedSchedule.location,
                          startedAt: updatedSchedule.startedAt,
                        }
                      : schedule
                ),
            },
          };
        }
      );
    },
  });
}
