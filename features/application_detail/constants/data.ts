export const dummyApplicationData = {
  applicationInfo: {
    applicationId: 1,
    company: 'Naver',
    position: 'Backend Developer',
    jobLocation: 'Seoul, Korea',
    jobPostingUrl: 'https://careers.naver.com/jobs/12345',
    currentStageType: '면접 전형',
    applicationStatus: 'IN_PROGRESS',
    deadline: '2025.03.25',
    applicationMethod: 'Online Application',
    memo: '네이버 백엔드 개발자 포지션 지원. 1차 면접 준비 중.',
    attachedFiles: [
      'resume_2025.pdf',
      'portfolio.pdf',
      'cover_letter.pdf'
    ],
  },
  applicationStageTimeLine: {
    docsStageTimeLine: {
      stageId: 1,
      scheduleName: '서류 전형',
      scheduleResult: 'PASS',
      submissionStatus: 'SUBMITTED',
    },
    etcStageTimeLine: [
      {
        stageId: 2,
        scheduleName: '코딩 테스트',
        scheduleResult: 'PASS',
        startedAt: '2025-01-15T10:00:00Z',
        endedAt: '2025-01-15T13:00:00Z',
      },
      {
        stageId: 3,
        scheduleName: '과제 제출',
        scheduleResult: 'WAITING',
        startedAt: '2025-02-01T00:00:00Z',
        endedAt: '2025-02-07T23:59:59Z',
      }
    ],
    interviewStageTimeLine: [
      {
        stageId: 4,
        scheduleName: '1차 면접',
        scheduleResult: 'WAITING',
        location: '서울 강남구 테헤란로 123 네이버 본사 8층',
        startedAt: '2025-02-20T14:00:00Z',
      },
      {
        stageId: 5,
        scheduleName: '2차 면접 (임원 면접)',
        scheduleResult: 'WAITING',
        location: '서울 강남구 테헤란로 123 네이버 본사 10층',
        startedAt: '2025-03-05T15:30:00Z',
      }
    ],
  },
};