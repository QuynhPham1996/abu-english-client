import { EUserStatus } from '@/common/enums';
import ApiService from '@/services/api';

// TYPES

export type TLoginParams = unknown;
export type TLoginBody = unknown;

export type TLoginMaterials = {
  params?: TLoginParams;
  body?: TLoginBody;
};

export type TLoginResponse = {
  data: {
    accessToken: string;
    status: EUserStatus;
  };
};

// FUNCTION

export const login = async ({ params, body }: TLoginMaterials): Promise<TLoginResponse> => {
  const response = await ApiService.post(`/auth/login`, body, { params });
  return response?.data;
};
