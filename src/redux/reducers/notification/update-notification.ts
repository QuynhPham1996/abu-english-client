import { TNotificationState } from '@/redux/reducers/notification';
import { TUpdateNotificationSuccess } from '@/redux/actions/notification';

export const updateNotificationUpdateState = (
  state: TNotificationState,
  action: TUpdateNotificationSuccess,
): TNotificationState => ({
  ...state,
  updateNotificationResponse: action.payload.response,
});
