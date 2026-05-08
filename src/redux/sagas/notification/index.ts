import { all, takeLatest } from 'redux-saga/effects';

import { createNotificationAction, getNotificationsAction, updateNotificationAction } from '@/redux/actions';

import { createNotificationSaga } from './create-notification';
import { getNotificationsSaga } from './get-notifications';
import { updateNotificationSaga } from './update-notification';

export default function* root(): Generator {
  yield all([
    takeLatest(createNotificationAction.request.type, createNotificationSaga),
    takeLatest(getNotificationsAction.request.type, getNotificationsSaga),
    takeLatest(updateNotificationAction.request.type, updateNotificationSaga),
  ]);
}
