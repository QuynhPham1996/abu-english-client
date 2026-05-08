import { TNotification } from '@/common/models';
import { TCommonPaginate } from '@/common/types';
import ApiService from '@/services/api';

// TYPES

export type TGetNotificationsParams = unknown;

export type TGetNotificationsMaterials = {
  params?: TGetNotificationsParams;
};

export type TGetNotificationsResponse = TCommonPaginate & {
  data: TNotification[];
  totalUnread: number;
};

// FUNCTION

export const getNotifications = async ({ params }: TGetNotificationsMaterials): Promise<TGetNotificationsResponse> => {
  const response = await ApiService.get(`/notifications`, { params });
  return response?.data;
};
