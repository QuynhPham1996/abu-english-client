import { TNotificationState } from '@/redux/reducers/notification';
import { TCreateNotificationSuccess } from '@/redux/actions/notification';

export const createNotificationUpdateState = (
  state: TNotificationState,
  action: TCreateNotificationSuccess,
): TNotificationState => ({
  ...state,
  createNotificationResponse: action.payload.response,
});
