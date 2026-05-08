import { createReducer } from 'deox';

import {
  TCreateNotificationResponse,
  TGetNotificationsResponse,
  TUpdateNotificationResponse,
} from '@/services/api/notification';
import { createNotificationAction, getNotificationsAction, updateNotificationAction } from '@/redux/actions';
import { createNotificationUpdateState } from './create-notification';
import { getNotificationsUpdateState } from './get-notifications';
import { updateNotificationUpdateState } from './update-notification';

export type TNotificationState = {
  createNotificationResponse?: TCreateNotificationResponse;
  getNotificationsResponse?: TGetNotificationsResponse;
  updateNotificationResponse?: TUpdateNotificationResponse;
};

const initialState: TNotificationState = {
  createNotificationResponse: undefined,
  getNotificationsResponse: undefined,
  updateNotificationResponse: undefined,
};

const NotificationReducer = createReducer(initialState, (handleAction) => [
  handleAction(createNotificationAction.success, createNotificationUpdateState),
  handleAction(getNotificationsAction.success, getNotificationsUpdateState),
  handleAction(updateNotificationAction.success, updateNotificationUpdateState),
]);

export default NotificationReducer;
