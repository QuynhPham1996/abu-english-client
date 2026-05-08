import ApiService from '@/services/api';

// TYPES

export type TCreateNotificationParams = unknown;
export type TCreateNotificationBody = unknown;

export type TCreateNotificationMaterials = {
  params?: TCreateNotificationParams;
  body?: TCreateNotificationBody;
};

export type TCreateNotificationResponse = unknown;

// FUNCTION

export const createNotification = async ({
  params,
  body,
}: TCreateNotificationMaterials): Promise<TCreateNotificationResponse> => {
  const response = await ApiService.post(`/notifications`, body, { params });
  return response?.data;
};
