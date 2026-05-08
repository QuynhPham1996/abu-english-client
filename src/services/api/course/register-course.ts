import ApiService from '@/services/api';

// TYPES

export type TRegisterCourseParams = unknown;
export type TRegisterCourseBody = unknown;

export type TRegisterCoursePaths = {
  id: string | number;
};

export type TRegisterCourseMaterials = {
  paths?: TRegisterCoursePaths;
  params?: TRegisterCourseParams;
  body?: TRegisterCourseBody;
};

export type TRegisterCourseResponse = unknown;

// FUNCTION

export const registerCourse = async ({
  params,
  body,
  paths,
}: TRegisterCourseMaterials): Promise<TRegisterCourseResponse> => {
  const response = await ApiService.post(`/courses/register/${paths?.id}`, body, { params });
  return response?.data;
};
