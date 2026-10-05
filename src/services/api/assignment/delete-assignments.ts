import ApiService from '@/services/api';

// TYPES

export type TDeleteAssignmentsParams = unknown;

export type TDeleteAssignmentsMaterials = {
  params?: TDeleteAssignmentsParams;
};

export type TDeleteAssignmentsResponse = unknown;

// FUNCTION

export const deleteAssignments = async ({ params }: TDeleteAssignmentsMaterials): Promise<TDeleteAssignmentsResponse> => {
  const response = await ApiService.delete(`/assignments`, { params });
  return response?.data;
};
