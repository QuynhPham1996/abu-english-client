import { TCourse } from '@/common/models';
import ApiService from '@/services/api';

// TYPES

export type TGetCoursesAvailableParams = unknown;

export type TGetCoursesAvailableMaterials = {
  params?: TGetCoursesAvailableParams;
};

export type TGetCoursesAvailableResponse = {
  data: TCourse[];
  totalExercises: { [key: string]: number };
  totalDurations: { [key: string]: number };
  totalUsers: { [key: string]: number };
};

// FUNCTION

export const getCoursesAvailable = async ({
  params,
}: TGetCoursesAvailableMaterials): Promise<TGetCoursesAvailableResponse> => {
  const response = await ApiService.get(`/courses/available`, { params });
  return response?.data;
};
