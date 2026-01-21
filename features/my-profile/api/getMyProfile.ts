import { clientApi } from '@/shared/lib/api/clientApi';
import { GetMyProfileResponse } from '../types';

export const getMyProfile = () => {
  return clientApi.get<GetMyProfileResponse>('/v1/members/profile');
};
