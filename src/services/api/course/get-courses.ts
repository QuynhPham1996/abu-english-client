import { TCourse } from '@/common/models';
import { TCommonPaginate } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetCoursesParams = unknown;

export type TGetCoursesMaterials = {
  params?: TGetCoursesParams;
};

export type TGetCoursesResponse = TCommonPaginate & {
  data: TCourse[];
  totalExercises: { [key: string]: number };
  totalDurations: { [key: string]: number };
  totalUsers: { [key: string]: number };
};

// FUNCTION

export const getCourses = async ({ params }: TGetCoursesMaterials): Promise<TGetCoursesResponse> => {
  const response = await ApiService.get(`/courses`, { params });
  return response?.data;
};
