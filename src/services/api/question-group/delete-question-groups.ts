import ApiService from '@/services/api';

// TYPES

export type TDeleteQuestionGroupsParams = unknown;

export type TDeleteQuestionGroupsMaterials = {
  params?: TDeleteQuestionGroupsParams;
};

export type TDeleteQuestionGroupsResponse = unknown;

// FUNCTION

export const deleteQuestionGroups = async ({ params }: TDeleteQuestionGroupsMaterials): Promise<TDeleteQuestionGroupsResponse> => {
  const response = await ApiService.delete(`/question-groups`, { params });
  return response?.data;
};
