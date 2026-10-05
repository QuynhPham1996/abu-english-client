import ApiService from '@/services/api';

// TYPES

export type TUpdateQuestionBankPaths = {
  id: string | number;
};

export type TUpdateQuestionBankBody = unknown;

export type TUpdateQuestionBankMaterials = {
  paths?: TUpdateQuestionBankPaths;
  body?: TUpdateQuestionBankBody;
};

export type TUpdateQuestionBankResponse = unknown;

// FUNCTION

export const updateQuestionBank = async ({ paths, body }: TUpdateQuestionBankMaterials): Promise<TUpdateQuestionBankResponse> => {
  const response = await ApiService.patch(`/question-bank/${paths?.id}`, body);
  return response?.data;
};
