import { TTest } from '@/common/models';
import { TCommonPaginate } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetTestsUserParams = unknown;

export type TGetTestsUserMaterials = {
  params?: TGetTestsUserParams;
};

export type TGetTestsUserResponse = TCommonPaginate & {
  data: TTest[];
  averageScore: number;
  totalUserLessons: number;
  passUserLessons: number;
};

// FUNCTION

export const getTestsUser = async ({ params }: TGetTestsUserMaterials): Promise<TGetTestsUserResponse> => {
  const response = await ApiService.get(`/tests/user`, { params });
  return response?.data;
};
