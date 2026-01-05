export interface ApplicationStats {
  /**
   * 전체 지원 건수
   */
  totalApplicationCount: number;
  /**
   * 서류 전형 중
   */
  docStageCount: number;
  /**
   * 면접 전형 중
   */
  interviewStageCount: number;
  /**
   * 기타 전형 중
   */
  etcStageCount: number;
  /**
   * 최종 합격
   */
  finalPassedCount: number;
  /**
   * 최종 불합격
   */
  finalFailedCount: number;
}
