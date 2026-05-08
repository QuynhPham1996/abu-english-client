import { TUser } from '@/common/models';
import ApiService from '@/services/api';

// TYPES

export type TGetMyProfileParams = unknown;

export type TGetMyProfileMaterials = {
  params?: TGetMyProfileParams;
};

export type TGetMyProfileResponse = { data: TUser };

// FUNCTION

export const getMyProfile = async ({ params }: TGetMyProfileMaterials): Promise<TGetMyProfileResponse> => {
  const response = await ApiService.get(`/users/my-profile`, { params });
  return response?.data;
};
