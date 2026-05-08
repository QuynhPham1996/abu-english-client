import { TCourse } from '@/common/models';
import ApiService from '@/services/api';

// TYPES

export type TGetMyCoursesParams = unknown;

export type TGetMyCoursesMaterials = {
  params?: TGetMyCoursesParams;
};

export type TGetMyCoursesResponse = { data: TCourse[] };

// FUNCTION

export const getMyCourses = async ({ params }: TGetMyCoursesMaterials): Promise<TGetMyCoursesResponse> => {
  const response = await ApiService.get(`/courses/my-courses`, { params });
  return response?.data;
};
