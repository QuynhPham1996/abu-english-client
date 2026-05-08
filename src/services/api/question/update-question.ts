import ApiService from '@/services/api';

// TYPES

export type TUpdateQuestionPaths = {
  id: string | number;
};
export type TUpdateQuestionBody = unknown;

export type TUpdateQuestionMaterials = {
  paths?: TUpdateQuestionPaths;
  body?: TUpdateQuestionBody;
};

export type TUpdateQuestionResponse = unknown;

// FUNCTION

export const updateQuestion = async ({ paths, body }: TUpdateQuestionMaterials): Promise<TUpdateQuestionResponse> => {
  const response = await ApiService.patch(`/questions/${paths?.id}`, body);
  return response?.data;
};
