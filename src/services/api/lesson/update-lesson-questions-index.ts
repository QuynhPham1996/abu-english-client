import ApiService from '@/services/api';

// TYPES

export type TUpdateLessonQuestionsIndexPaths = {
  id: string | number;
};
export type TUpdateLessonQuestionsIndexBody = unknown;

export type TUpdateLessonQuestionsIndexMaterials = {
  paths?: TUpdateLessonQuestionsIndexPaths;
  body?: TUpdateLessonQuestionsIndexBody;
};

export type TUpdateLessonQuestionsIndexResponse = unknown;

// FUNCTION

export const updateLessonQuestionsIndex = async ({
  paths,
  body,
}: TUpdateLessonQuestionsIndexMaterials): Promise<TUpdateLessonQuestionsIndexResponse> => {
  const response = await ApiService.patch(`/lessons/${paths?.id}/questions-index`, body);
  return response?.data;
};
