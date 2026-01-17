import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/shared/lib/api/clientApi';
import {
  EtcScheduleRequest,
  ScheduleResponse,
  ApplicationDetailResponse,
} from '../types';
import { applicationDetailKeys } from './useGetApplicationDetail';

export function useUpdateEtcSchedule(applicationId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      scheduleId,
      data,
    }: {
      scheduleId: number;
      data: EtcScheduleRequest;
    }) => {
      console.log(data);
      const newData = clientApi.put<ScheduleResponse>(
        `/v1/applications/${applicationId}/schedules/etc/${scheduleId}`,
        data
      );
      return newData
    },
    onSuccess: (updatedSchedule) => {
      queryClient.setQueryData(
        applicationDetailKeys.detail(applicationId),
        (oldData: ApplicationDetailResponse | undefined) => {
          if (!oldData) return oldData;
          console.log({
            ...oldData,
            applicationStageTimeLine: {
              ...oldData.applicationStageTimeLine,
              etcStageTimeLine:
                oldData.applicationStageTimeLine.etcStageTimeLine.map(
                  (schedule) =>
                    schedule.scheduleId === updatedSchedule.id
                      ? {
                          stageId: schedule.stageId,
                          scheduleId: updatedSchedule.id,
                          scheduleName: updatedSchedule.scheduleName,
                          scheduleResult: updatedSchedule.scheduleResult,
                          startedAt: updatedSchedule.startedAt,
                          endedAt: updatedSchedule.endedAt,
                        }
                      : schedule
                ),
            },
          });
          console.log(updatedSchedule.scheduleResult);
          return {
            ...oldData,
            applicationStageTimeLine: {
              ...oldData.applicationStageTimeLine,
              etcStageTimeLine:
                oldData.applicationStageTimeLine.etcStageTimeLine.map(
                  (schedule) =>
                    schedule.scheduleId === updatedSchedule.id
                      ? {
                          stageId: schedule.stageId,
                          scheduleId: updatedSchedule.id,
                          scheduleName: updatedSchedule.scheduleName,
                          scheduleResult: updatedSchedule.scheduleResult,
                          startedAt: updatedSchedule.startedAt,
                          endedAt: updatedSchedule.endedAt,
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
