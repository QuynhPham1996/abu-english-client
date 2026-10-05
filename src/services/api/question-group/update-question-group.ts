import ApiService from '@/services/api';

// TYPES

export type TUpdateQuestionGroupPaths = {
  id: string | number;
};

export type TUpdateQuestionGroupBody = unknown;

export type TUpdateQuestionGroupMaterials = {
  paths?: TUpdateQuestionGroupPaths;
  body?: TUpdateQuestionGroupBody;
};

export type TUpdateQuestionGroupResponse = unknown;

// FUNCTION

export const updateQuestionGroup = async ({ paths, body }: TUpdateQuestionGroupMaterials): Promise<TUpdateQuestionGroupResponse> => {
  const response = await ApiService.patch(`/question-groups/${paths?.id}`, body);
  return response?.data;
};
