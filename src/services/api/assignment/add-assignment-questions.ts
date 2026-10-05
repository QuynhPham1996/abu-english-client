import ApiService from '@/services/api';

// TYPES

export type TAddAssignmentQuestionsPaths = {
  id: string | number;
};

export type TAddAssignmentQuestionsBody = {
  questionIds: string[];
};

export type TAddAssignmentQuestionsMaterials = {
  paths?: TAddAssignmentQuestionsPaths;
  body?: TAddAssignmentQuestionsBody;
};

export type TAddAssignmentQuestionsResponse = unknown;

// FUNCTION

export const addAssignmentQuestions = async ({ paths, body }: TAddAssignmentQuestionsMaterials): Promise<TAddAssignmentQuestionsResponse> => {
  const response = await ApiService.post(`/assignments/${paths?.id}/questions`, body);
  return response?.data;
};
