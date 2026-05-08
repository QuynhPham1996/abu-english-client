import ApiService from '@/services/api';

// TYPES

export type TCreateQuestionParams = unknown;
export type TCreateQuestionBody = unknown;

export type TCreateQuestionMaterials = {
  params?: TCreateQuestionParams;
  body?: TCreateQuestionBody;
};

export type TCreateQuestionResponse = unknown;

// FUNCTION

export const createQuestion = async ({ params, body }: TCreateQuestionMaterials): Promise<TCreateQuestionResponse> => {
  const response = await ApiService.post(`/questions`, body, { params });
  return response?.data;
};
