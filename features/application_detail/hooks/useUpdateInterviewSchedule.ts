import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/shared/lib/api/clientApi';
import {
  InterviewScheduleRequest,
  ScheduleResponse,
  ApplicationDetailResponse,
} from '../types';
import { applicationDetailKeys } from './useGetApplicationDetail';
import { syncTimelineState, TimelineSyncResult } from '../lib/timelineSync';

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
      const updatedSchedule = await clientApi.put<ScheduleResponse>(
        `/v1/applications/${applicationId}/schedules/interview/${scheduleId}`,
        data
      );

      // 타임라인 자동 동기화: 불합격 관련 변경 시 최종결과/현재단계 연동
      const currentData = queryClient.getQueryData<ApplicationDetailResponse>(
        applicationDetailKeys.detail(applicationId)
      );

      let syncResult: TimelineSyncResult = {};
      if (currentData) {
        const previousResult =
          currentData.applicationStageTimeLine.interviewStageTimeLine.find(
            (s) => s.scheduleId === scheduleId,
          )?.scheduleResult ?? 'WAITING';

        const simulatedData: ApplicationDetailResponse = {
          ...currentData,
          applicationStageTimeLine: {
            ...currentData.applicationStageTimeLine,
            interviewStageTimeLine:
              currentData.applicationStageTimeLine.interviewStageTimeLine.map(
                (s) =>
                  s.scheduleId === scheduleId
                    ? { ...s, scheduleResult: updatedSchedule.scheduleResult }
                    : s,
              ),
          },
        };

        syncResult = await syncTimelineState(
          applicationId,
          previousResult,
          updatedSchedule.scheduleResult,
          simulatedData,
        );
      }

      return { updatedSchedule, syncResult };
    },
    onSuccess: ({ updatedSchedule, syncResult }) => {
      queryClient.setQueryData(
        applicationDetailKeys.detail(applicationId),
        (oldData: ApplicationDetailResponse | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            applicationInfo: {
              ...oldData.applicationInfo,
              ...(syncResult.applicationStatus && {
                applicationStatus: syncResult.applicationStatus,
              }),
              ...(syncResult.currentStageType && {
                currentStageType: syncResult.currentStageType,
              }),
            },
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
