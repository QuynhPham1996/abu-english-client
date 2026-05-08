import ApiService from '@/services/api';

// TYPES

export type TUpdateMyProfileBody = unknown;

export type TUpdateMyProfileMaterials = {
  body?: TUpdateMyProfileBody;
};

export type TUpdateMyProfileResponse = unknown;

// FUNCTION

export const updateMyProfile = async ({ body }: TUpdateMyProfileMaterials): Promise<TUpdateMyProfileResponse> => {
  const response = await ApiService.put(`/users/my-profile`, body);
  return response?.data;
};
