import ApiService from '@/services/api';

// TYPES

export type TDeleteQuestionsParams = unknown;

export type TDeleteQuestionsMaterials = {
  params?: TDeleteQuestionsParams;
};

export type TDeleteQuestionsResponse = unknown;

// FUNCTION

export const deleteQuestions = async ({ params }: TDeleteQuestionsMaterials): Promise<TDeleteQuestionsResponse> => {
  const response = await ApiService.delete(`/questions`, { params });
  return response?.data;
};
