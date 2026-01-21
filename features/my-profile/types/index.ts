export interface GetMyProfileResponse {
  nickname: string;
  /**
   * 회원 역할
   */
  role: 'ROLE_MEMBER' | 'ROLE_ADMIN';
  /**
   * 프로필 이미지 URL
   */
  profileImageUrl?: string | null;
  /**
   * 회원가입 일시
   */
  createdAt: string;
}

export interface PatchProfileRequest {
  nickname: string;
  profileImageUrl: string;
}

export interface PatchProfileResponse {
  nickname: string;
  role: string;
  profileImageUrl: string;
  createdAt: string;
}
