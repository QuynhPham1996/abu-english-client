import { TQuestion, TTest } from '@/common/models';
import ApiService from '@/services/api';

// TYPES

export type TGetTestUserPaths = {
  id: string | number;
};
export type TGetTestUserParams = unknown;

export type TGetTestUserMaterials = {
  paths?: TGetTestUserPaths;
  params?: TGetTestUserParams;
};

export type TGetTestUserResponse = {
  data: TTest;
  questions: TQuestion[];
};

// FUNCTION

export const getTestUser = async ({ paths, params }: TGetTestUserMaterials): Promise<TGetTestUserResponse> => {
  const response = await ApiService.get(`/tests/user/${paths?.id}`, { params });
  return response?.data;
};
