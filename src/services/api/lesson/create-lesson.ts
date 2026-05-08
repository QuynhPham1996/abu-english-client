import ApiService from '@/services/api';

// TYPES

export type TCreateLessonParams = unknown;
export type TCreateLessonBody = unknown;

export type TCreateLessonMaterials = {
  params?: TCreateLessonParams;
  body?: TCreateLessonBody;
};

export type TCreateLessonResponse = unknown;

// FUNCTION

export const createLesson = async ({ params, body }: TCreateLessonMaterials): Promise<TCreateLessonResponse> => {
  const response = await ApiService.post(`/lessons`, body, { params });
  return response?.data;
};
