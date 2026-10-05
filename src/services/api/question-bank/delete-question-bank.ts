import ApiService from '@/services/api';

// TYPES

export type TDeleteQuestionBankParams = unknown;

export type TDeleteQuestionBankMaterials = {
  params?: TDeleteQuestionBankParams;
};

export type TDeleteQuestionBankResponse = unknown;

// FUNCTION

export const deleteQuestionBank = async ({ params }: TDeleteQuestionBankMaterials): Promise<TDeleteQuestionBankResponse> => {
  const response = await ApiService.delete(`/question-bank`, { params });
  return response?.data;
};
