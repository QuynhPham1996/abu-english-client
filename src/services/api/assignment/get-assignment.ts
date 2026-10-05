import { TAssignment } from '@/common/models';
import ApiService from '@/services/api';

// TYPES

export type TGetAssignmentPaths = {
  id: string | number;
};

export type TGetAssignmentMaterials = {
  paths?: TGetAssignmentPaths;
};

export type TGetAssignmentResponse = {
  data: TAssignment;
};

// FUNCTION

export const getAssignment = async ({ paths }: TGetAssignmentMaterials): Promise<TGetAssignmentResponse> => {
  const response = await ApiService.get(`/assignments/${paths?.id}`);
  return response?.data;
};
