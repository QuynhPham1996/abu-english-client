import { TQuestionGroup } from '@/common/models';

import ApiService from '@/services/api';

// TYPES

export type TCreateQuestionGroupBody = unknown;

export type TCreateQuestionGroupMaterials = {
  body?: TCreateQuestionGroupBody;
};

export type TCreateQuestionGroupResponse = {
  data?: TQuestionGroup;
};

// FUNCTION

export const createQuestionGroup = async ({ body }: TCreateQuestionGroupMaterials): Promise<TCreateQuestionGroupResponse> => {
  const response = await ApiService.post(`/question-groups`, body);
  return response?.data;
};
