import { clientApi } from '@/shared/lib/api/clientApi';
import { ApplicationStage, ScheduleResult } from '@/shared/types';
import { ApplicationDetailResponse, ApplicationStatus } from '../types';
import { useTimelineStore } from '../stores/useTimeLineStore';

/**
 * 타임라인 내 모든 전형 결과에서 불합격이 있는지 확인
 */
export function hasAnyFailInTimeline(data: ApplicationDetailResponse): boolean {
  const { docsStageTimeLine, etcStageTimeLine, interviewStageTimeLine } =
    data.applicationStageTimeLine;

  if (docsStageTimeLine?.scheduleResult === 'FAIL') return true;
  if (etcStageTimeLine?.some((s) => s.scheduleResult === 'FAIL')) return true;
  if (interviewStageTimeLine?.some((s) => s.scheduleResult === 'FAIL'))
    return true;

  return false;
}

/**
 * 합격한 전형 중 가장 높은 단계를 계산
 * 면접 > 기타 > 서류 순서
 */
function computeCurrentStageFromPasses(
  data: ApplicationDetailResponse,
): ApplicationStage {
  const { docsStageTimeLine, etcStageTimeLine, interviewStageTimeLine } =
    data.applicationStageTimeLine;

  if (interviewStageTimeLine?.some((s) => s.scheduleResult === 'PASS'))
    return 'INTERVIEW';
  if (etcStageTimeLine?.some((s) => s.scheduleResult === 'PASS')) return 'ETC';
  if (docsStageTimeLine?.scheduleResult === 'PASS') return 'DOCUMENT';

  return 'DOCUMENT';
}

/**
 * 이전 단계에 불합격이 있는지 확인
 * 서류 → 기타 → 면접 순서로, 이전 단계가 불합격이면 현재 단계에서 합격 불가
 */
export function hasPreviousStageFail(
  stage: ApplicationStage,
  data: ApplicationDetailResponse,
): boolean {
  const { docsStageTimeLine, etcStageTimeLine } =
    data.applicationStageTimeLine;

  if (stage === 'ETC') {
    return docsStageTimeLine?.scheduleResult === 'FAIL';
  }

  if (stage === 'INTERVIEW') {
    if (docsStageTimeLine?.scheduleResult === 'FAIL') return true;
    if (etcStageTimeLine?.some((s) => s.scheduleResult === 'FAIL')) return true;
    return false;
  }

  return false;
}

/**
 * 특정 스테이지 내 모든 일정이 합격인지 확인
 */
export function isStageAllPassed(
  stage: ApplicationStage,
  data: ApplicationDetailResponse,
): boolean {
  const { docsStageTimeLine, etcStageTimeLine, interviewStageTimeLine } =
    data.applicationStageTimeLine;

  if (stage === 'DOCUMENT') {
    return docsStageTimeLine?.scheduleResult === 'PASS';
  }

  if (stage === 'ETC') {
    return (
      etcStageTimeLine?.length > 0 &&
      etcStageTimeLine.every((s) => s.scheduleResult === 'PASS')
    );
  }

  if (stage === 'INTERVIEW') {
    return (
      interviewStageTimeLine?.length > 0 &&
      interviewStageTimeLine.every((s) => s.scheduleResult === 'PASS')
    );
  }

  if (stage === 'APPLICATION_CLOSE') {
    return data.applicationInfo.applicationStatus === 'FINAL_PASS';
  }

  return false;
}

/**
 * 특정 스테이지 내 하나라도 불합격이 있는지 확인
 */
export function isStageHasAnyFail(
  stage: ApplicationStage,
  data: ApplicationDetailResponse,
): boolean {
  const { docsStageTimeLine, etcStageTimeLine, interviewStageTimeLine } =
    data.applicationStageTimeLine;

  if (stage === 'DOCUMENT') {
    return docsStageTimeLine?.scheduleResult === 'FAIL';
  }

  if (stage === 'ETC') {
    return etcStageTimeLine?.some((s) => s.scheduleResult === 'FAIL') ?? false;
  }

  if (stage === 'INTERVIEW') {
    return (
      interviewStageTimeLine?.some((s) => s.scheduleResult === 'FAIL') ?? false
    );
  }

  if (stage === 'APPLICATION_CLOSE') {
    return data.applicationInfo.applicationStatus === 'FINAL_FAIL';
  }

  return false;
}

export interface TimelineSyncResult {
  applicationStatus?: ApplicationStatus;
  currentStageType?: ApplicationStage;
}

/**
 * 전형 결과 변경 시 최종결과와 현재단계를 자동으로 동기화
 *
 * - 불합격이 하나라도 있으면 → 최종불합격 + 지원종료
 * - 불합격이 모두 해소되면 → 진행중으로 복구 + 가장 높은 합격 단계로 이동
 */
export async function syncTimelineState(
  applicationId: number,
  previousResult: ScheduleResult,
  newResult: ScheduleResult,
  simulatedData: ApplicationDetailResponse,
): Promise<TimelineSyncResult> {
  // 불합격 관련 변경이 아니면 동기화 불필요
  const isFailRelated = previousResult === 'FAIL' || newResult === 'FAIL';
  if (!isFailRelated) return {};

  const hasFail = hasAnyFailInTimeline(simulatedData);
  const currentStatus = simulatedData.applicationInfo.applicationStatus;
  const currentStage = simulatedData.applicationInfo
    .currentStageType as ApplicationStage;

  const result: TimelineSyncResult = {};

  if (hasFail) {
    // 불합격 존재 → 최종불합격 + 지원종료
    if (currentStatus !== 'FINAL_FAIL') {
      await clientApi.patch<void>(
        `/v1/applications/${applicationId}/final-result`,
        { applicationStatus: 'FINAL_FAIL' },
      );
      result.applicationStatus = 'FINAL_FAIL';
    }
    if (currentStage !== 'APPLICATION_CLOSE') {
      await clientApi.patch<void>(
        `/v1/applications/${applicationId}/current-stage`,
        { currentStageType: 'APPLICATION_CLOSE' },
      );
      result.currentStageType = 'APPLICATION_CLOSE';
    }
  } else if (previousResult === 'FAIL') {
    // 불합격이 해소됨 → 진행중으로 복구
    if (currentStatus === 'FINAL_FAIL') {
      await clientApi.patch<void>(
        `/v1/applications/${applicationId}/final-result`,
        { applicationStatus: 'IN_PROGRESS' },
      );
      result.applicationStatus = 'IN_PROGRESS';
    }

    // 가장 높은 합격 단계로 현재단계 이동
    const recommendedStage = computeCurrentStageFromPasses(simulatedData);
    if (
      currentStage === 'APPLICATION_CLOSE' ||
      currentStage !== recommendedStage
    ) {
      await clientApi.patch<void>(
        `/v1/applications/${applicationId}/current-stage`,
        { currentStageType: recommendedStage },
      );
      result.currentStageType = recommendedStage;
    }
  }

  // Zustand 스토어 동기화 (UI 하이라이트 반영)
  if (result.currentStageType) {
    useTimelineStore.getState().setActiveStage(result.currentStageType);
  }

  return result;
}
