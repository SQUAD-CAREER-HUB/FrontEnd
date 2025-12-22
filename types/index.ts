export type ApplicationStatus = 'PENDING' | 'PASSED' | 'REJECTED' | 'CANCELED';

export interface JobApplication {
  id: number;
  companyName: string;      // 기업명
  position: string;         // 직무
  currentStage: string;     // 전형명 (예: 서류, 1차 면접)
  status: ApplicationStatus; // 합격 여부 (대기, 합격, 불합격 등)
  appliedDate: string;      // 지원일 (ISO 8601 format recommended)
  deadlineDate: string;     // 마감일
  nextInterviewDate: string | null; // 다음 면접일 (없을 수 있으므로 null 허용)
}

export interface StageData {
  title: string;
  datetime: string;
}