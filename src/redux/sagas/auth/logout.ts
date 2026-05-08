import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { logoutAction } from '@/redux/actions';
import { logout, TLogoutResponse } from '@/services/api';

// FUNCTION

export function* logoutSaga(action: ActionType<typeof logoutAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(logout, materials);
    const logoutResponse: TLogoutResponse = response as TLogoutResponse;
    yield put(logoutAction.success(logoutResponse));
    successCallback?.(logoutResponse);
  } catch (err) {
    yield put(logoutAction.failure(err));
    failedCallback?.(err);
  }
}
