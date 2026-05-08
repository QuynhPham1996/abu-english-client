import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { createNotificationAction } from '@/redux/actions';
import { createNotification, TCreateNotificationResponse } from '@/services/api';

// FUNCTION

export function* createNotificationSaga(action: ActionType<typeof createNotificationAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(createNotification, materials);
    const createNotificationResponse: TCreateNotificationResponse = response as TCreateNotificationResponse;
    yield put(createNotificationAction.success(createNotificationResponse));
    successCallback?.(createNotificationResponse);
  } catch (err) {
    yield put(createNotificationAction.failure(err));
    failedCallback?.(err);
  }
}
