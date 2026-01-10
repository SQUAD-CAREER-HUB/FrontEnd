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
  switch (result) {
    case 'PASS':
      return 'text-green-600 bg-green-50 border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/50';
    case 'FAIL':
      return 'text-red-600 bg-red-50 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/50';
    default: // WAITING
      return 'text-yellow-600 bg-yellow-50 border-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-900/50';
  }
};

// 현재 전형 결과 라벨
const getScheduleResultLabel = (result: string) => {
  switch (result) {
    case 'PASS':
      return '합격';
    case 'FAIL':
      return '불합격';
    default:
      return '대기중';
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

export { getStatusStyle, getStatusLabel, getScheduleResultStyle, getScheduleResultLabel, formatDate };