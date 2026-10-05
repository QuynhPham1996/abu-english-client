import ApiService from '@/services/api';

// TYPES

export type TCreateAssignmentBody = unknown;

export type TCreateAssignmentMaterials = {
  body?: TCreateAssignmentBody;
};

export type TCreateAssignmentResponse = unknown;

// FUNCTION

export const createAssignment = async ({ body }: TCreateAssignmentMaterials): Promise<TCreateAssignmentResponse> => {
  const response = await ApiService.post(`/assignments`, body);
  return response?.data;
};
