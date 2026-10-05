import { TAssignment } from '@/common/models';
import { TCommonPaginate } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetAssignmentsParams = unknown;

export type TGetAssignmentsMaterials = {
  params?: TGetAssignmentsParams;
};

export type TGetAssignmentsResponse = TCommonPaginate & {
  data: TAssignment[];
  totalQuestions: { [key: string]: number };
};

// FUNCTION

export const getAssignments = async ({ params }: TGetAssignmentsMaterials): Promise<TGetAssignmentsResponse> => {
  const response = await ApiService.get(`/assignments`, { params });
  return response?.data;
};
