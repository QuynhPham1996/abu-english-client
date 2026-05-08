import ApiService from '@/services/api';

// TYPES

export type TChangeUserPasswordPaths = {
  id: string | number;
};
export type TChangeUserPasswordBody = unknown;

export type TChangeUserPasswordMaterials = {
  paths?: TChangeUserPasswordPaths;
  body?: TChangeUserPasswordBody;
};

export type TChangeUserPasswordResponse = unknown;

// FUNCTION

export const changeUserPassword = async ({
  paths,
  body,
}: TChangeUserPasswordMaterials): Promise<TChangeUserPasswordResponse> => {
  const response = await ApiService.patch(`/users/${paths?.id}/change-password`, body);
  return response?.data;
};
