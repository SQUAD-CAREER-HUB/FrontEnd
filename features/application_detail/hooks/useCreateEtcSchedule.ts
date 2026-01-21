import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/shared/lib/api/clientApi';
import {
  EtcScheduleRequest,
  ScheduleResponse,
  ApplicationDetailResponse,
  EtcStageTimeLine,
} from '../types';
import { applicationDetailKeys } from './useGetApplicationDetail';

export function useCreateEtcSchedule(applicationId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EtcScheduleRequest) => {
      return clientApi.post<ScheduleResponse>(
        `/v1/applications/${applicationId}/schedules/etc`,
        data
      );
    },
    onSuccess: (newSchedule) => {
      queryClient.setQueryData(
        applicationDetailKeys.detail(applicationId),
        (oldData: ApplicationDetailResponse | undefined) => {
          if (!oldData) return oldData;

          const newEtcTimeline: EtcStageTimeLine = {
            stageId: newSchedule.id,
            scheduleId: newSchedule.id,
            scheduleName: newSchedule.scheduleName,
            scheduleResult: newSchedule.scheduleResult,
            startedAt: newSchedule.startedAt,
            endedAt: newSchedule.endedAt,
          };

          return {
            ...oldData,
            applicationStageTimeLine: {
              ...oldData.applicationStageTimeLine,
              etcStageTimeLine: [
                ...oldData.applicationStageTimeLine.etcStageTimeLine,
                newEtcTimeline,
              ],
            },
          };
        }
      );
    },
  });
}
