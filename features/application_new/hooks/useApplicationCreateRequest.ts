import { useStoreWithEqualityFn } from 'zustand/traditional'
import { selectApplicationCreateRequest, useNewApplicationStore } from '../stores/useNewApplicationStore';

export const useApplicationCreateRequest = () =>
  useStoreWithEqualityFn(useNewApplicationStore, selectApplicationCreateRequest);