import ApiService from '@/services/api';

// TYPES

export type TDeleteExercisesParams = unknown;

export type TDeleteExercisesMaterials = {
  params?: TDeleteExercisesParams;
};

export type TDeleteExercisesResponse = unknown;

// FUNCTION

export const deleteExercises = async ({ params }: TDeleteExercisesMaterials): Promise<TDeleteExercisesResponse> => {
  const response = await ApiService.delete(`/exercises`, { params });
  return response?.data;
};
