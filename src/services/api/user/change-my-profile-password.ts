import ApiService from '@/services/api';

// TYPES

export type TChangeMyProfilePasswordBody = unknown;

export type TChangeMyProfilePasswordMaterials = {
  body?: TChangeMyProfilePasswordBody;
};

export type TChangeMyProfilePasswordResponse = unknown;

// FUNCTION

export const changeMyProfilePassword = async ({
  body,
}: TChangeMyProfilePasswordMaterials): Promise<TChangeMyProfilePasswordResponse> => {
  const response = await ApiService.put(`/users/my-profile/password`, body);
  return response?.data;
};
