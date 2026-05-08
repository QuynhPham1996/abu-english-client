import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { createQuestionAction } from '@/redux/actions';
import { createQuestion, TCreateQuestionResponse } from '@/services/api';

// FUNCTION

export function* createQuestionSaga(action: ActionType<typeof createQuestionAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(createQuestion, materials);
    const createQuestionResponse: TCreateQuestionResponse = response as TCreateQuestionResponse;
    yield put(createQuestionAction.success(createQuestionResponse));
    successCallback?.(createQuestionResponse);
  } catch (err) {
    yield put(createQuestionAction.failure(err));
    failedCallback?.(err);
  }
}
