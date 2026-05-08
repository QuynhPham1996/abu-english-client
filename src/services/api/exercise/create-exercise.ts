import ApiService from '@/services/api';

// TYPES

export type TCreateExerciseParams = unknown;
export type TCreateExerciseBody = unknown;

export type TCreateExerciseMaterials = {
  params?: TCreateExerciseParams;
  body?: TCreateExerciseBody;
};

export type TCreateExerciseResponse = unknown;

// FUNCTION

export const createExercise = async ({ params, body }: TCreateExerciseMaterials): Promise<TCreateExerciseResponse> => {
  const response = await ApiService.post(`/exercises`, body, { params });
  return response?.data;
};
