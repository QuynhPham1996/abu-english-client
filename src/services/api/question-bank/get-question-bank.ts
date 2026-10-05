import { TQuestion } from '@/common/models';
import { TCommonPaginate } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetQuestionBankParams = unknown;

export type TGetQuestionBankMaterials = {
  params?: TGetQuestionBankParams;
};

export type TGetQuestionBankResponse = TCommonPaginate & {
  data: TQuestion[];
};

// FUNCTION

export const getQuestionBank = async ({ params }: TGetQuestionBankMaterials): Promise<TGetQuestionBankResponse> => {
  const response = await ApiService.get(`/question-bank`, { params });
  return response?.data;
};
