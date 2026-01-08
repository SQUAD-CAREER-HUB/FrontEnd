import { JobApplication } from "@/shared/types";

const dummyApplications: JobApplication[] = [
  {
    id: 1,
    companyName: "네이버",
    position: "Frontend Developer",
    currentStage: "1차 실무 면접",
    status: "WAITING",
    appliedDate: "2025-10-10",
    deadlineDate: "2025-10-25",
    nextInterviewDate: "2025-11-05T14:00:00", // 면접 예정
  },
  {
    id: 2,
    companyName: "토스",
    position: "React Native App Developer",
    currentStage: "최종 합격",
    status: "PASS",
    appliedDate: "2025-09-15",
    deadlineDate: "2025-09-30",
    nextInterviewDate: null, // 최종 합격이라 면접일 없음
  },
  {
    id: 3,
    companyName: "우아한형제들",
    position: "Web Frontend",
    currentStage: "서류 전형",
    status: "FAILED",
    appliedDate: "2025-10-01",
    deadlineDate: "2025-10-15",
    nextInterviewDate: null, // 탈락이라 면접일 없음
  },
  {
    id: 4,
    companyName: "당근",
    position: "Software Engineer (Mobile)",
    currentStage: "코딩 테스트",
    status: "PASS",
    appliedDate: "2025-10-20",
    deadlineDate: "2025-11-01",
    nextInterviewDate: null, // 코테 합격 후 면접 일정 조율 중 (null)
  },
  {
    id: 5,
    companyName: "카카오",
    position: "Frontend 채용 연계형 인턴",
    currentStage: "2차 임원 면접",
    status: "WAITING",
    appliedDate: "2025-09-20",
    deadlineDate: "2025-10-05",
    nextInterviewDate: "2025-11-12T10:30:00",
  },
];

export default dummyApplications;