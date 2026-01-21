import { clientApi } from '@/shared/lib/api/clientApi';
import { PatchProfileRequest, PatchProfileResponse } from '../types';

export const patchMyProfile = (
  bodyData: PatchProfileRequest
): Promise<PatchProfileResponse> => {
  return clientApi.patch('/v1/members/profile', bodyData);
};
