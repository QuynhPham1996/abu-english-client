import { TQuestion } from '@/common/models';
import ApiService from '@/services/api';

// TYPES

export type TGetQuestionBankItemPaths = {
  id: string | number;
};

export type TGetQuestionBankItemMaterials = {
  paths?: TGetQuestionBankItemPaths;
};

export type TGetQuestionBankItemResponse = {
  data: TQuestion;
};

// FUNCTION

export const getQuestionBankItem = async ({
  paths,
}: TGetQuestionBankItemMaterials): Promise<TGetQuestionBankItemResponse> => {
  const response = await ApiService.get(`/question-bank/${paths?.id}`);
  return response?.data;
};
