import { TTest } from '@/common/models';
import { TCommonPaginate } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetTestsParams = unknown;

export type TGetTestsMaterials = {
  params?: TGetTestsParams;
};

export type TGetTestsResponse = TCommonPaginate & {
  data: TTest[];
};

// FUNCTION

export const getTests = async ({ params }: TGetTestsMaterials): Promise<TGetTestsResponse> => {
  const response = await ApiService.get(`/tests`, { params });
  return response?.data;
};
