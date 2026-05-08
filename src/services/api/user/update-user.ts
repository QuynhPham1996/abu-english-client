import ApiService from '@/services/api';

// TYPES

export type TUpdateUserPaths = {
  id: string | number;
};
export type TUpdateUserBody = unknown;

export type TUpdateUserMaterials = {
  paths?: TUpdateUserPaths;
  body?: TUpdateUserBody;
};

export type TUpdateUserResponse = unknown;

// FUNCTION

export const updateUser = async ({ paths, body }: TUpdateUserMaterials): Promise<TUpdateUserResponse> => {
  const response = await ApiService.patch(`/users/${paths?.id}`, body);
  return response?.data;
};
