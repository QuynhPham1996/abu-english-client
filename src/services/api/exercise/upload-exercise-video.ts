import ApiService from '@/services/api';

// TYPES

export type TUploadExerciseVideoPaths = {
  id: string | number;
};
export type TUploadExerciseVideoParams = unknown;
export type TUploadExerciseVideoBody = unknown;

export type TUploadExerciseVideoMaterials = {
  paths?: TUploadExerciseVideoPaths;
  params?: TUploadExerciseVideoParams;
  body?: TUploadExerciseVideoBody;
};

export type TUploadExerciseVideoResponse = unknown;

// FUNCTION

export const uploadExerciseVideo = async ({
  paths,
  params,
  body,
}: TUploadExerciseVideoMaterials): Promise<TUploadExerciseVideoResponse> => {
  const response = await ApiService.post(`/exercises/${paths?.id}`, body, { params });
  return response?.data;
};
