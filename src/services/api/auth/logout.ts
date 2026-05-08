import ApiService from '@/services/api';

// TYPES

export type TLogoutParams = unknown;
export type TLogoutBody = unknown;

export type TLogoutMaterials = {
  params?: TLogoutParams;
  body?: TLogoutBody;
};

export type TLogoutResponse = unknown;

// FUNCTION

export const logout = async ({ params, body }: TLogoutMaterials): Promise<TLogoutResponse> => {
  const response = await ApiService.post(`/auth/logout`, body, { params });
  return response?.data;
};
