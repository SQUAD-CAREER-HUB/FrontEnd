'use client';

import { useQuery } from '@tanstack/react-query';

// 백엔드 데이터 타입 정의
interface UserProfile {
  memberId: number;
  nickname: string;
}

export default function DashboardPage() {
  /**
   * TanStack Query를 이용한 프로필 조회
   * 별도의 클라이언트 없이 직접 fetch를 사용합니다.
   */
  const { data, isLoading, isError, error } = useQuery<UserProfile>({
    queryKey: ['user-profile'],
    queryFn: async () => {
      // 1. 우리가 만든 BFF 주소로 요청을 보냅니다.
      // 2. 브라우저는 동일 도메인 요청이므로 쿠키(access_token)를 자동으로 동봉합니다.
      const response = await fetch('/api/bff/v1/members/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // 응답 상태 확인
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || '프로필을 불러오지 못했습니다.');
      }

      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 캐싱
  });

  // 로딩 중일 때 UI
  if (isLoading) return <div className='p-8'>로딩 중...</div>;

  // 에러 발생 시 UI
  if (isError)
    return <div className='p-8 text-red-500'>에러: {error.message}</div>;

  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-4'>Dashboard Page</h1>

      <div className='border p-4 rounded-lg bg-slate-50'>
        <h2 className='text-lg font-semibold mb-2'>내 정보</h2>
        <div className='space-y-1'>
          <p>닉네임: {data?.nickname}</p>
          <p>id: {data?.memberId}</p>
        </div>
      </div>
    </div>
  );
}
