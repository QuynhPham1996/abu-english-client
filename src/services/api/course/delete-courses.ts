import ApiService from '@/services/api';

// TYPES

export type TDeleteCoursesParams = unknown;

export type TDeleteCoursesMaterials = {
  params?: TDeleteCoursesParams;
};

export type TDeleteCoursesResponse = unknown;

// FUNCTION

export const deleteCourses = async ({ params }: TDeleteCoursesMaterials): Promise<TDeleteCoursesResponse> => {
  const response = await ApiService.delete(`/courses`, { params });
  return response?.data;
};
