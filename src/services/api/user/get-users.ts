import { TUser } from '@/common/models';
import { TCommonPaginate } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetUsersParams = unknown;

export type TGetUsersMaterials = {
  params?: TGetUsersParams;
};

export type TGetUsersResponse = TCommonPaginate & {
  data: TUser[];
};

// FUNCTION

export const getUsers = async ({ params }: TGetUsersMaterials): Promise<TGetUsersResponse> => {
  const response = await ApiService.get(`/users`, { params });
  return response?.data;
};
