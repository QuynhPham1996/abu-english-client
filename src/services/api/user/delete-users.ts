import ApiService from '@/services/api';

// TYPES

export type TDeleteUsersParams = unknown;

export type TDeleteUsersMaterials = {
  params?: TDeleteUsersParams;
};

export type TDeleteUsersResponse = unknown;

// FUNCTION

export const deleteUsers = async ({ params }: TDeleteUsersMaterials): Promise<TDeleteUsersResponse> => {
  const response = await ApiService.delete(`/users`, { params });
  return response?.data;
};
