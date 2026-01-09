export const INTERVIEW_PRESETS = [
  { value: 'TECH', label: '기술 면접' },
  { value: 'FIT', label: '컬처핏/인성 면접' },
  { value: 'EXECUTIVE', label: '임원 면접' },
  { value: 'DESIGN', label: '시스템 디자인 면접' },
  { value: 'TEST', label: '라이브 코딩 테스트 면접' },
  { value: 'ETC', label: '기타' },
] as const;

// Value를 Key로 하는 매핑 객체
export const INTERVIEW_LABEL_MAP: Record<string, string> =
  INTERVIEW_PRESETS.reduce(
    (acc, curr) => ({ ...acc, [curr.value]: curr.label }),
    {}
  );

// 타입 추론을 위한 유니온 타입 생성 (선택 사항)
export type InterviewType = (typeof INTERVIEW_PRESETS)[number]['value'];
