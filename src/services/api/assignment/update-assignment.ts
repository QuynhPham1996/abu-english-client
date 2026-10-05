import ApiService from '@/services/api';

// TYPES

export type TUpdateAssignmentPaths = {
  id: string | number;
};

export type TUpdateAssignmentBody = unknown;

export type TUpdateAssignmentMaterials = {
  paths?: TUpdateAssignmentPaths;
  body?: TUpdateAssignmentBody;
};

export type TUpdateAssignmentResponse = unknown;

// FUNCTION

export const updateAssignment = async ({ paths, body }: TUpdateAssignmentMaterials): Promise<TUpdateAssignmentResponse> => {
  const response = await ApiService.patch(`/assignments/${paths?.id}`, body);
  return response?.data;
};
