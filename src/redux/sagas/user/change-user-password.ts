import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { changeUserPasswordAction } from '@/redux/actions';
import { changeUserPassword, TChangeUserPasswordResponse } from '@/services/api';

// FUNCTION

export function* changeUserPasswordSaga(action: ActionType<typeof changeUserPasswordAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(changeUserPassword, materials);
    const changeUserPasswordResponse: TChangeUserPasswordResponse = response as TChangeUserPasswordResponse;
    yield put(changeUserPasswordAction.success(changeUserPasswordResponse));
    successCallback?.(changeUserPasswordResponse);
  } catch (err) {
    yield put(changeUserPasswordAction.failure(err));
    failedCallback?.(err);
  }
}
