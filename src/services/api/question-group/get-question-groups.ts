import { TQuestionGroup } from '@/common/models';
import { TCommonPaginate } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetQuestionGroupsParams = unknown;

export type TGetQuestionGroupsMaterials = {
  params?: TGetQuestionGroupsParams;
};

export type TGetQuestionGroupsResponse = TCommonPaginate & {
  data: TQuestionGroup[];
  totalQuestions: { [key: string]: number };
};

// FUNCTION

export const getQuestionGroups = async ({
  params,
}: TGetQuestionGroupsMaterials): Promise<TGetQuestionGroupsResponse> => {
  const response = await ApiService.get(`/question-groups`, { params });
  return response?.data;
};
