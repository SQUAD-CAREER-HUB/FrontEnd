import { ApplicationStats } from '.';

export type ApplicationStatsResponse = ApplicationStats;

/** 마감 전 지원서 개별 아이템 (Response) */
export interface BeforeDeadlineApplicationResponse {
  applicationId: number;
  company: string;
  position: string;
  deadline: string; // ISO 8601
  applicationMethod: string;
  submissionStatus: string; // "제출 완료" 등
}

/** 마감 전 지원서 목록 응답 (커서 페이징) */
export interface BeforeDeadlineListResponse {
  contents: BeforeDeadlineApplicationResponse[];
  hasNext: boolean;
  nextCursorId: number | null;
}

/** API 요청 파라미터 */
export interface GetBeforeDeadlineParams {
  lastCursorId?: number;
  size?: number;
}

/** 다가오는 일정 개별 아이템 (Server Response DTO) */
export interface UpcomingScheduleResponse {
  scheduleId: number;
  applicationId: number;
  companyName: string;
  stageType: string;
  scheduleName: string; // 'TECH', 'FINAL', 'ETC' 등
  startedAt: string; // '2026-01-30T10:00:00'
  endedAt?: string;
  location?: string;
}

/** 다가오는 일정 목록 응답 (Cursor Paging) */
export interface UpcomingScheduleListResponse {
  contents: UpcomingScheduleResponse[];
  hasNext: boolean;
  nextCursorId: number | null;
}

/** 개별 통계 데이터 항목 */
export interface StatisticItem {
  period: string; // "01.02 - 01.08" 또는 "2025.08"
  count: number;
}

/** 주간 통계 아이템 (isCurrentWeek 필수) */
export interface WeeklyStatisticItem extends StatisticItem {
  isCurrentWeek: boolean;
}

/** 월간 통계 아이템 (isCurrentMonth 필수) */
export interface MonthlyStatisticItem extends StatisticItem {
  isCurrentMonth: boolean;
}

/** 생성 통계 API 응답 타입 */
export interface ApplicationCreationStatisticsResponse {
  weeklyStatistics: WeeklyStatisticItem[];
  monthlyStatistics: MonthlyStatisticItem[];
}

/** API 요청 파라미터 */
export interface GetApplicationStatisticsParams {
  weekCount?: number;
  monthCount?: number;
}
