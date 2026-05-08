import ApiService from '@/services/api';

// TYPES

export type TUpdateExercisePaths = {
  id: string | number;
};
export type TUpdateExerciseBody = unknown;

export type TUpdateExerciseMaterials = {
  paths?: TUpdateExercisePaths;
  body?: TUpdateExerciseBody;
};

export type TUpdateExerciseResponse = unknown;

// FUNCTION

export const updateExercise = async ({ paths, body }: TUpdateExerciseMaterials): Promise<TUpdateExerciseResponse> => {
  const response = await ApiService.patch(`/exercises/${paths?.id}`, body);
  return response?.data;
};
