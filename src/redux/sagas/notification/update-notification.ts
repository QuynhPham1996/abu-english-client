import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updateNotificationAction } from '@/redux/actions';
import { updateNotification, TUpdateNotificationResponse } from '@/services/api';

// FUNCTION

export function* updateNotificationSaga(action: ActionType<typeof updateNotificationAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updateNotification, materials);
    const updateNotificationResponse: TUpdateNotificationResponse = response as TUpdateNotificationResponse;
    yield put(updateNotificationAction.success(updateNotificationResponse));
    successCallback?.(updateNotificationResponse);
  } catch (err) {
    yield put(updateNotificationAction.failure(err));
    failedCallback?.(err);
  }
}
