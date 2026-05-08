import ApiService from '@/services/api';

// TYPES

export type TUpdateLessonPaths = {
  id: string | number;
};
export type TUpdateLessonBody = unknown;

export type TUpdateLessonMaterials = {
  paths?: TUpdateLessonPaths;
  body?: TUpdateLessonBody;
};

export type TUpdateLessonResponse = unknown;

// FUNCTION

export const updateLesson = async ({ paths, body }: TUpdateLessonMaterials): Promise<TUpdateLessonResponse> => {
  const response = await ApiService.patch(`/lessons/${paths?.id}`, body);
  return response?.data;
};
