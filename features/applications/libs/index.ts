// 지원 상태에 따른 배지 스타일
const getStatusStyle = (status: string) => {
  switch (status) {
    case 'FINAL_PASS':
      return 'text-blue-600 bg-blue-50 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/50';
    case 'FINAL_FAIL':
      return 'text-gray-600 bg-gray-50 border-gray-100 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-900/50';
    default: // IN_PROGRESS
      return 'text-orange-600 bg-orange-50 border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-900/50';
  }
};

// 지원 상태 라벨
const getStatusLabel = (status: string) => {
  switch (status) {
    case 'FINAL_PASS':
      return '최종 합격';
    case 'FINAL_FAIL':
      return '최종 탈락';
    default:
      return '진행중';
  }
};

// 현재 전형 결과에 따른 스타일
const getScheduleResultStyle = (result: string) => {
  console.log(result);
  switch (result) {
    case 'PASS':
      return 'text-green-600 bg-green-50 border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/50';
    case 'FAIL':
      return 'text-red-600 bg-red-50 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/50';
    case 'WAITING':
      return 'text-yellow-600 bg-yellow-50 border-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-900/50';
    case '마감 임박':
      return 'text-red-500 bg-red-50 border border-red-100 animate-pulse dark:bg-red-900/20 dark:border-red-900/50';
  }
};

// D-day 라벨 스타일
const getDdayStyle = (dDay: number | null) => {
  if (dDay === null) return '';

  if (dDay <= 7) {
    return 'text-slate-700 dark:text-slate-200';
  }

  return 'text-red-600 dark:text-red-400 font-bold';
};

// 현재 전형 결과 라벨
const getScheduleResultLabel = (result: string) => {
  console.log(result);
  switch (result) {
    case 'PASS':
      return '전형 합격';
    case 'FAIL':
      return '불합격';
    case 'WAITING':
      return '대기중';
    default:
      return '마감 임박';
  }
};

// 전형 타입에 따른 배지 스타일
const getStageTypeStyle = (stageType: string) => {
  switch (stageType) {
    case '면접 전형':
      return 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800';
    case '지원 종료':
      return 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';
    case '서류 전형':
      return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800';
    case '기타 전형':
      return 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800';
    default:
      return 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';
  }
};

// 날짜 포맷팅
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export { getStatusStyle, getStatusLabel, getScheduleResultStyle, getScheduleResultLabel, getStageTypeStyle, formatDate, getDdayStyle };