import ApiService from '@/services/api';

// TYPES

export type TUpdateAssignmentQuestionsIndexPaths = {
  id: string | number;
};

export type TUpdateAssignmentQuestionsIndexBody = unknown;

export type TUpdateAssignmentQuestionsIndexMaterials = {
  paths?: TUpdateAssignmentQuestionsIndexPaths;
  body?: TUpdateAssignmentQuestionsIndexBody;
};

export type TUpdateAssignmentQuestionsIndexResponse = unknown;

// FUNCTION

export const updateAssignmentQuestionsIndex = async ({ paths, body }: TUpdateAssignmentQuestionsIndexMaterials): Promise<TUpdateAssignmentQuestionsIndexResponse> => {
  const response = await ApiService.patch(`/assignments/${paths?.id}/questions-index`, body);
  return response?.data;
};
