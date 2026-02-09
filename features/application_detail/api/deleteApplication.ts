import { clientApi } from '@/shared/lib/api/clientApi';

export const deleteApplication = (applicationId: number) => {
  return clientApi.delete(`/v1/applications/${applicationId}`);
};
