import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/shared/lib/api/clientApi';
import { ApplicationDetailResponse } from '../types';
import { applicationDetailKeys } from './useGetApplicationDetail';
import { useParams } from 'next/navigation';

type ScheduleType = 'interview' | 'other';

export function useDeleteSchedule(type: ScheduleType) {
  const queryClient = useQueryClient();
  const params = useParams();
  const applicationId = Number(params.id);

  return useMutation({
    mutationFn: async (scheduleId: number) => {
      await clientApi.delete(
        `/v1/applications/${applicationId}/schedules/${scheduleId}`
      );
      return scheduleId;
    },
    onSuccess: (deletedScheduleId) => {
      queryClient.setQueryData(
        applicationDetailKeys.detail(applicationId),
        (oldData: ApplicationDetailResponse | undefined) => {
          if (!oldData) return oldData;

          if (type === 'interview') {
            return {
              ...oldData,
              applicationStageTimeLine: {
                ...oldData.applicationStageTimeLine,
                interviewStageTimeLine:
                  oldData.applicationStageTimeLine.interviewStageTimeLine.filter(
                    (schedule) => schedule.scheduleId !== deletedScheduleId
                  ),
              },
            };
          }

          return {
            ...oldData,
            applicationStageTimeLine: {
              ...oldData.applicationStageTimeLine,
              etcStageTimeLine:
                oldData.applicationStageTimeLine.etcStageTimeLine.filter(
                  (schedule) => schedule.scheduleId !== deletedScheduleId
                ),
            },
          };
        }
      );
    },
    onError: (error) => {
      console.error('Delete Schedule Error:', error);
      alert('일정 삭제에 실패했습니다. 다시 시도해 주세요.');
    },
  });
}
