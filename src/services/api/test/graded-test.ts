import ApiService from '@/services/api';

// TYPES

export type TGradedTestPaths = {
  id: string | number;
};
export type TGradedTestBody = unknown;

export type TGradedTestMaterials = {
  paths?: TGradedTestPaths;
  body?: TGradedTestBody;
};

export type TGradedTestResponse = unknown;

// FUNCTION

export const gradedTest = async ({ paths, body }: TGradedTestMaterials): Promise<TGradedTestResponse> => {
  const response = await ApiService.patch(`/tests/${paths?.id}`, body);
  return response?.data;
};
