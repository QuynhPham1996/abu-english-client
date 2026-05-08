import ApiService from '@/services/api';

// TYPES

export type TSendContactParams = unknown;
export type TSendContactBody = unknown;

export type TSendContactMaterials = {
  params?: TSendContactParams;
  body?: TSendContactBody;
};

export type TSendContactResponse = unknown;

// FUNCTION

export const sendContact = async ({ params, body }: TSendContactMaterials): Promise<TSendContactResponse> => {
  const response = await ApiService.post(`/public/contact`, body, { params });
  return response?.data;
};
