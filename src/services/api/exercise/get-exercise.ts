import { TExercise } from '@/common/models';
import ApiService from '@/services/api';

// TYPES

export type TGetExercisePaths = {
  id: string | number;
  courseId: string | number;
};
export type TGetExerciseParams = unknown;

export type TGetExerciseMaterials = {
  paths?: TGetExercisePaths;
  params?: TGetExerciseParams;
};

export type TGetExerciseResponse = { data: TExercise };

// FUNCTION

export const getExercise = async ({ paths, params }: TGetExerciseMaterials): Promise<TGetExerciseResponse> => {
  const response = await ApiService.get(`/exercises/${paths?.courseId}/${paths?.id}`, { params });
  return response?.data;
};
