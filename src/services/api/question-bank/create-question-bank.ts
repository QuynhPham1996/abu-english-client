import ApiService from '@/services/api';

// TYPES

export type TCreateQuestionBankBody = unknown;

export type TCreateQuestionBankMaterials = {
  body?: TCreateQuestionBankBody;
};

export type TCreateQuestionBankResponse = unknown;

// FUNCTION

export const createQuestionBank = async ({ body }: TCreateQuestionBankMaterials): Promise<TCreateQuestionBankResponse> => {
  const response = await ApiService.post(`/question-bank`, body);
  return response?.data;
};
