export const documentStatusOptions = [
  { value: "NOT_SUBMITTED", label: "미제출" },
  { value: "SUBMITTED", label: "제출 완료" }
];

export const applicationMethodOptions = [
  { value: "HOMEPAGE", label: "홈페이지 지원" },
  { value: "EMAIL", label: "이메일" },
  { value: "PLATFORM", label: "채용 플랫폼" },
  { value: "REFERRAL", label: "지인 추천" },
  { value: "EMPTY", label: "미선택" }
];

// 서버에서 한글로 받은 값을 영어 value로 변환하는 매핑
export const APPLICATION_METHOD_LABEL_TO_VALUE: Record<string, string> = {
  '홈페이지 지원': 'HOMEPAGE',
  '이메일': 'EMAIL',
  '채용 플랫폼': 'PLATFORM',
  '지인 추천': 'REFERRAL',
  '미선택': 'EMPTY',
  '미입력': 'EMPTY',
  EMPTY: 'EMPTY',
};

// 영어 value를 한글 label로 변환하는 매핑
export const APPLICATION_METHOD_VALUE_TO_LABEL: Record<string, string> = {
  HOMEPAGE: '홈페이지 지원',
  EMAIL: '이메일',
  PLATFORM: '채용 플랫폼',
  REFERRAL: '지인 추천',
  EMPTY: '미선택',
};

export const DIRECT_INPUT_VALUE = '직접 입력';

export const interviewOptions = [
  { label: '1차 면접', value: '1차 면접' },
  { label: '2차 면접', value: '2차 면접' },
  { label: '기술 면접', value: '기술 면접' },
  { label: '컬처핏 면접', value: '컬처핏 면접' },
  { label: '임원 면접', value: '임원 면접' },
  { label: '인사 면접', value: '인사 면접' },
  { label: '최종 면접', value: '최종 면접' },
  { label: '직접 입력', value: DIRECT_INPUT_VALUE },
];