import ApiService from '@/services/api';

// TYPES

export type TCreateCourseParams = unknown;
export type TCreateCourseBody = unknown;

export type TCreateCourseMaterials = {
  params?: TCreateCourseParams;
  body?: TCreateCourseBody;
};

export type TCreateCourseResponse = unknown;

// FUNCTION

export const createCourse = async ({ params, body }: TCreateCourseMaterials): Promise<TCreateCourseResponse> => {
  const response = await ApiService.post(`/courses`, body, { params });
  return response?.data;
};
