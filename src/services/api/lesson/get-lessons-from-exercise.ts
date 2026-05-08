import { TLesson } from '@/common/models';
import ApiService from '@/services/api';

// TYPES

export type TGetLessonsFromExercisePaths = {
  exerciseid: string | number;
};
export type TGetLessonsFromExerciseParams = unknown;

export type TGetLessonsFromExerciseMaterials = {
  paths?: TGetLessonsFromExercisePaths;
  params?: TGetLessonsFromExerciseParams;
};

export type TGetLessonsFromExerciseResponse = {
  data: TLesson[];
  totalLessons: number;
  totalQuestions: number;
};

// FUNCTION

export const getLessonsFromExercise = async ({
  paths,
  params,
}: TGetLessonsFromExerciseMaterials): Promise<TGetLessonsFromExerciseResponse> => {
  const response = await ApiService.get(`/lessons/${paths?.exerciseid}`, { params });
  return response?.data;
};
