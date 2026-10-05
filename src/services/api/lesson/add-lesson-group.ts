import ApiService from '@/services/api';

// TYPES

export type TAddLessonGroupPaths = {
  id: string | number;
};

export type TAddLessonGroupBody = {
  groupId: string;
};

export type TAddLessonGroupMaterials = {
  paths?: TAddLessonGroupPaths;
  body?: TAddLessonGroupBody;
};

export type TAddLessonGroupResponse = unknown;

// FUNCTION

export const addLessonGroup = async ({ paths, body }: TAddLessonGroupMaterials): Promise<TAddLessonGroupResponse> => {
  const response = await ApiService.post(`/lessons/${paths?.id}/groups`, body);
  return response?.data;
};
