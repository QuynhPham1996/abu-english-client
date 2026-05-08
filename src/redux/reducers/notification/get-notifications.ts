import { TNotificationState } from '@/redux/reducers/notification';
import { TGetNotificationsSuccess } from '@/redux/actions/notification';

export const getNotificationsUpdateState = (
  state: TNotificationState,
  action: TGetNotificationsSuccess,
): TNotificationState => ({
  ...state,
  getNotificationsResponse: action.payload.response,
});
