import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getTestUserAction } from '@/redux/actions';
import { getTestUser, TGetTestUserResponse } from '@/services/api';

// FUNCTION

export function* getTestUserSaga(action: ActionType<typeof getTestUserAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getTestUser, materials);
    const getTestUserResponse: TGetTestUserResponse = response as TGetTestUserResponse;
    yield put(getTestUserAction.success(getTestUserResponse));
    successCallback?.(getTestUserResponse);
  } catch (err) {
    yield put(getTestUserAction.failure(err));
    failedCallback?.(err);
  }
}
