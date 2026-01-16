export const documentStatusOptions = [
    { value: "미제출", label: "미제출" },
    { value: "제출 완료", label: "제출 완료" }
  ]

export const applicationMethodOptions = [
    { value: "HOMEPAGE", label: "홈페이지 지원" },
    { value: "EMAIL", label: "이메일" },
    { value: "PLATFORM", label: "채용 플랫폼" },
    { value: "REFERRAL", label: "지인 추천" },
    { value: "EMPTY", label: "미선택" }
  ]

  // 마감일시는 실제로는 DatePicker를 사용하는 것이 좋지만, 
  // DropDown을 사용하라고 하셨으니 예시로 만들어드립니다
export const deadlineOptions = [
    { value: "2024-12-31", label: "2024-12-31" },
    { value: "2025-01-15", label: "2025-01-15" },
    { value: "2025-01-31", label: "2025-01-31" }
  ]