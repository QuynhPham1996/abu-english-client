import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updateQuestionAction } from '@/redux/actions';
import { updateQuestion, TUpdateQuestionResponse } from '@/services/api';

// FUNCTION

export function* updateQuestionSaga(action: ActionType<typeof updateQuestionAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updateQuestion, materials);
    const updateQuestionResponse: TUpdateQuestionResponse = response as TUpdateQuestionResponse;
    yield put(updateQuestionAction.success(updateQuestionResponse));
    successCallback?.(updateQuestionResponse);
  } catch (err) {
    yield put(updateQuestionAction.failure(err));
    failedCallback?.(err);
  }
}
