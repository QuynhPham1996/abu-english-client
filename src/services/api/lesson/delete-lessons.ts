import ApiService from '@/services/api';

// TYPES

export type TDeleteLessonsParams = unknown;

export type TDeleteLessonsMaterials = {
  params?: TDeleteLessonsParams;
};

export type TDeleteLessonsResponse = unknown;

// FUNCTION

export const deleteLessons = async ({ params }: TDeleteLessonsMaterials): Promise<TDeleteLessonsResponse> => {
  const response = await ApiService.delete(`/lessons`, { params });
  return response?.data;
};
