import ApiService from '@/services/api';

// TYPES

export type TUpdateNotificationPaths = {
  id: string | number;
};
export type TUpdateNotificationBody = unknown;

export type TUpdateNotificationMaterials = {
  paths?: TUpdateNotificationPaths;
  body?: TUpdateNotificationBody;
};

export type TUpdateNotificationResponse = unknown;

// FUNCTION

export const updateNotification = async ({
  paths,
  body,
}: TUpdateNotificationMaterials): Promise<TUpdateNotificationResponse> => {
  const response = await ApiService.patch(`/notifications/${paths?.id}`, body);
  return response?.data;
};
