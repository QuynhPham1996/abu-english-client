import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getTestsUserAction } from '@/redux/actions';
import { getTestsUser, TGetTestsUserResponse } from '@/services/api';

// FUNCTION

export function* getTestsUserSaga(action: ActionType<typeof getTestsUserAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getTestsUser, materials);
    const getTestsUserResponse: TGetTestsUserResponse = response as TGetTestsUserResponse;
    yield put(getTestsUserAction.success(getTestsUserResponse));
    successCallback?.(getTestsUserResponse);
  } catch (err) {
    yield put(getTestsUserAction.failure(err));
    failedCallback?.(err);
  }
}
