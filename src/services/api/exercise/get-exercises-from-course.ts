import { TExercise } from '@/common/models';
import { TCommonPaginate } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetExercisesFromCoursePaths = {
  courseId: string | number;
};
export type TGetExercisesFromCourseParams = unknown;

export type TGetExercisesFromCourseMaterials = {
  paths?: TGetExercisesFromCoursePaths;
  params?: TGetExercisesFromCourseParams;
};

export type TGetExercisesFromCourseResponse = TCommonPaginate & {
  data: TExercise[];
  totalLessons: { [key: string]: number };
  totalQuestions: { [key: string]: number };
  totalExercises: number;
  totalDurations: number;
};

// FUNCTION

export const getExercisesFromCourse = async ({
  paths,
  params,
}: TGetExercisesFromCourseMaterials): Promise<TGetExercisesFromCourseResponse> => {
  const response = await ApiService.get(`/exercises/${paths?.courseId}`, { params });
  return response?.data;
};
