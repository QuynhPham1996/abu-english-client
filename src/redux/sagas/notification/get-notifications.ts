import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getNotificationsAction } from '@/redux/actions';
import { getNotifications, TGetNotificationsResponse } from '@/services/api';

// FUNCTION

export function* getNotificationsSaga(action: ActionType<typeof getNotificationsAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getNotifications, materials);
    const getNotificationsResponse: TGetNotificationsResponse = response as TGetNotificationsResponse;
    yield put(getNotificationsAction.success(getNotificationsResponse));
    successCallback?.(getNotificationsResponse);
  } catch (err) {
    yield put(getNotificationsAction.failure(err));
    failedCallback?.(err);
  }
}
