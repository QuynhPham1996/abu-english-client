import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { createTestAction } from '@/redux/actions';
import { createTest, TCreateTestResponse } from '@/services/api';

// FUNCTION

export function* createTestSaga(action: ActionType<typeof createTestAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(createTest, materials);
    const createTestResponse: TCreateTestResponse = response as TCreateTestResponse;
    yield put(createTestAction.success(createTestResponse));
    successCallback?.(createTestResponse);
  } catch (err) {
    yield put(createTestAction.failure(err));
    failedCallback?.(err);
  }
}
