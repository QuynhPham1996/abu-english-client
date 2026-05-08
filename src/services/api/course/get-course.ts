import { TCourse } from '@/common/models';
import ApiService from '@/services/api';

// TYPES

export type TGetCoursePaths = {
  id: string | number;
};
export type TGetCourseParams = unknown;

export type TGetCourseMaterials = {
  paths?: TGetCoursePaths;
  params?: TGetCourseParams;
};

export type TGetCourseResponse = { data: TCourse };

// FUNCTION

export const getCourse = async ({ paths, params }: TGetCourseMaterials): Promise<TGetCourseResponse> => {
  const response = await ApiService.get(`/courses/detail/${paths?.id}`, { params });
  return response?.data;
};
