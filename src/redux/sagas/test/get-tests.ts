import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getTestsAction } from '@/redux/actions';
import { getTests, TGetTestsResponse } from '@/services/api';

// FUNCTION

export function* getTestsSaga(action: ActionType<typeof getTestsAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getTests, materials);
    const getTestsResponse: TGetTestsResponse = response as TGetTestsResponse;
    yield put(getTestsAction.success(getTestsResponse));
    successCallback?.(getTestsResponse);
  } catch (err) {
    yield put(getTestsAction.failure(err));
    failedCallback?.(err);
  }
}
