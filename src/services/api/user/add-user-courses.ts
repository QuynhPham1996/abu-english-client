import ApiService from '@/services/api';

// TYPES

export type TAddUserCoursesPaths = {
  id: string | number;
};
export type TAddUserCoursesParams = unknown;
export type TAddUserCoursesBody = unknown;

export type TAddUserCoursesMaterials = {
  paths?: TAddUserCoursesPaths;
  params?: TAddUserCoursesParams;
  body?: TAddUserCoursesBody;
};

export type TAddUserCoursesResponse = unknown;

// FUNCTION

export const addUserCourses = async ({
  paths,
  params,
  body,
}: TAddUserCoursesMaterials): Promise<TAddUserCoursesResponse> => {
  const response = await ApiService.post(`/users/${paths?.id}/add-courses`, body, { params });
  return response?.data;
};
