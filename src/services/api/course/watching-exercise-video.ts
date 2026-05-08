import ApiService from '@/services/api';

// TYPES

export type TWatchingExerciseVideoPaths = {
  id: string | number;
};
export type TWatchingExerciseVideoBody = unknown;

export type TWatchingExerciseVideoMaterials = {
  paths?: TWatchingExerciseVideoPaths;
  body?: TWatchingExerciseVideoBody;
};

export type TWatchingExerciseVideoResponse = unknown;

// FUNCTION

export const watchingExerciseVideo = async ({
  paths,
  body,
}: TWatchingExerciseVideoMaterials): Promise<TWatchingExerciseVideoResponse> => {
  const response = await ApiService.patch(`/courses/my-courses/${paths?.id}`, body);
  return response?.data;
};
