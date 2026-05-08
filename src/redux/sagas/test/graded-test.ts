import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { gradedTestAction } from '@/redux/actions';
import { gradedTest, TGradedTestResponse } from '@/services/api';

// FUNCTION

export function* gradedTestSaga(action: ActionType<typeof gradedTestAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(gradedTest, materials);
    const gradedTestResponse: TGradedTestResponse = response as TGradedTestResponse;
    yield put(gradedTestAction.success(gradedTestResponse));
    successCallback?.(gradedTestResponse);
  } catch (err) {
    yield put(gradedTestAction.failure(err));
    failedCallback?.(err);
  }
}
