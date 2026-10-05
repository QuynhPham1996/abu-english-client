import ApiService from '@/services/api';

// TYPES

export type TAddAssignmentGroupPaths = {
  id: string | number;
};

export type TAddAssignmentGroupBody = {
  groupId: string;
};

export type TAddAssignmentGroupMaterials = {
  paths?: TAddAssignmentGroupPaths;
  body?: TAddAssignmentGroupBody;
};

export type TAddAssignmentGroupResponse = unknown;

// FUNCTION

export const addAssignmentGroup = async ({ paths, body }: TAddAssignmentGroupMaterials): Promise<TAddAssignmentGroupResponse> => {
  const response = await ApiService.post(`/assignments/${paths?.id}/groups`, body);
  return response?.data;
};
