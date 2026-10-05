import { TTest, TUserExercises, TUserLessons } from '@/common/models';
import ApiService from '@/services/api';

// TYPES

export type TGetMyCourseExercisePaths = {
  id: string | number;
};
export type TGetMyCourseExerciseParams = unknown;

export type TGetMyCourseExerciseMaterials = {
  paths?: TGetMyCourseExercisePaths;
  params?: TGetMyCourseExerciseParams;
};

export type TGetMyCourseExerciseResponse = {
  data: TUserExercises;
  totalQuestions: { [key: string]: number };
  userLessons: TUserLessons[];
  userExercises: TUserExercises[];
  tests: TTest[];
  gradedLessonIds?: string[];
};

// FUNCTION

export const getMyCourseExercise = async ({
  paths,
  params,
}: TGetMyCourseExerciseMaterials): Promise<TGetMyCourseExerciseResponse> => {
  const response = await ApiService.get(`/courses/my-courses/${paths?.id}`, { params });
  return response?.data;
};
