import { TCourse } from '@/common/models';
import ApiService from '@/services/api';

// TYPES

export type TGetPublicCoursesParams = unknown;

export type TGetPublicCoursesMaterials = {
  params?: TGetPublicCoursesParams;
};

export type TGetPublicCoursesResponse = {
  data: TCourse[];
  totalExercises: { [key: string]: number };
  totalDurations: { [key: string]: number };
  totalUsers: { [key: string]: number };
};

// FUNCTION

export const getPublicCourses = async ({ params }: TGetPublicCoursesMaterials): Promise<TGetPublicCoursesResponse> => {
  const response = await ApiService.get(`/public/courses`, { params });
  return response?.data;
};
