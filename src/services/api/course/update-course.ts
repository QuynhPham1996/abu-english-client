import ApiService from '@/services/api';

// TYPES

export type TUpdateCoursePaths = {
  id: string | number;
};
export type TUpdateCourseBody = unknown;

export type TUpdateCourseMaterials = {
  paths?: TUpdateCoursePaths;
  body?: TUpdateCourseBody;
};

export type TUpdateCourseResponse = unknown;

// FUNCTION

export const updateCourse = async ({ paths, body }: TUpdateCourseMaterials): Promise<TUpdateCourseResponse> => {
  const response = await ApiService.patch(`/courses/${paths?.id}`, body);
  return response?.data;
};
