export interface MemberProfile {
  memberId: number;
  nickname: string;
  role: 'ROLE_MEMBER' | 'ROLE_ADMIN'; // Enum 형태 권장
  profileImageUrl?: string | null;
  createdAt: string;
}

export type GetMyProfileResponse = MemberProfile;
