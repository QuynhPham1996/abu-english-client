import ApiService from '@/services/api';

// TYPES

export type TCreateTestParams = unknown;
export type TCreateTestBody = unknown;

export type TCreateTestMaterials = {
  params?: TCreateTestParams;
  body?: TCreateTestBody;
};

export type TCreateTestResponse = unknown;

// FUNCTION

export const createTest = async ({ params, body }: TCreateTestMaterials): Promise<TCreateTestResponse> => {
  const response = await ApiService.post(`/tests`, body, { params });
  return response?.data;
};
