import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updateQuestionBankAction } from '@/redux/actions';
import { updateQuestionBank, TUpdateQuestionBankResponse } from '@/services/api';

// FUNCTION

export function* updateQuestionBankSaga(action: ActionType<typeof updateQuestionBankAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updateQuestionBank, materials);
    const updateQuestionBankResponse: TUpdateQuestionBankResponse = response as TUpdateQuestionBankResponse;
    yield put(updateQuestionBankAction.success(updateQuestionBankResponse));
    successCallback?.(updateQuestionBankResponse);
  } catch (err) {
    yield put(updateQuestionBankAction.failure(err));
    failedCallback?.(err);
  }
}
