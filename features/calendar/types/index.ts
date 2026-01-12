import { DocumentStatus } from './filter';

/** 전형 단계 타입 (API Available values 기반) */
export type StageType = 'DOCUMENT' | 'ETC' | 'INTERVIEW' | 'APPLICATION_CLOSE';

/** 결과 기준 필터 타입 (선택 사항) */
export type ResultCriteria = 'STAGE_PASS' | 'FINAL_PASS' | 'FINAL_FAIL';

/** 서류 상태 필터 타입 (선택 사항) */
export type SubmissionStatus = 'NOT_SUBMITTED' | 'SUBMITTED';

/** 캘린더 개별 일정 아이템 인터페이스 */
export interface ScheduleItem {
  /** 일정 식별자 */
  scheduleId: number;
  /** 지원서 식별자 */
  applicationId: number;
  /** 기업명 */
  companyName: string;
  /** 전형 단계 */
  stageType: StageType;
  // 서류 상태
  documentStatus: DocumentStatus;
  /** 일정 명칭 (예: 1차 면접, 서류 마감 등) */
  scheduleName: string;
  /** 시작 일시 (ISO 8601 형식) */
  startedAt: string;
  /** 종료 일시 (ISO 8601 형식) */
  endedAt: string;
  /** 장소 (온라인 링크 또는 주소) */
  location: string;
}

/** 캘린더 통합 일정 조회 응답 인터페이스 */
export interface SchedulesResponse {
  items: ScheduleItem[];
}
