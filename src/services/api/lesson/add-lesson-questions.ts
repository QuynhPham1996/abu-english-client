import ApiService from '@/services/api';

// TYPES

export type TAddLessonQuestionsPaths = {
  id: string | number;
};

export type TAddLessonQuestionsBody = {
  questionIds: string[];
};

export type TAddLessonQuestionsMaterials = {
  paths?: TAddLessonQuestionsPaths;
  body?: TAddLessonQuestionsBody;
};

export type TAddLessonQuestionsResponse = unknown;

// FUNCTION

export const addLessonQuestions = async ({
  paths,
  body,
}: TAddLessonQuestionsMaterials): Promise<TAddLessonQuestionsResponse> => {
  const response = await ApiService.post(`/lessons/${paths?.id}/questions`, body);
  return response?.data;
};
