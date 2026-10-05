import { TQuestionGroup } from '@/common/models';
import ApiService from '@/services/api';

// TYPES

export type TGetQuestionGroupPaths = {
  id: string | number;
};

export type TGetQuestionGroupMaterials = {
  paths?: TGetQuestionGroupPaths;
};

export type TGetQuestionGroupResponse = {
  data: TQuestionGroup;
  totalQuestions: number;
};

// FUNCTION

export const getQuestionGroup = async ({ paths }: TGetQuestionGroupMaterials): Promise<TGetQuestionGroupResponse> => {
  const response = await ApiService.get(`/question-groups/${paths?.id}`);
  return response?.data;
};
