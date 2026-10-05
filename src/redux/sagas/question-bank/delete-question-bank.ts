import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { deleteQuestionBankAction } from '@/redux/actions';
import { deleteQuestionBank, TDeleteQuestionBankResponse } from '@/services/api';

// FUNCTION

export function* deleteQuestionBankSaga(action: ActionType<typeof deleteQuestionBankAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(deleteQuestionBank, materials);
    const deleteQuestionBankResponse: TDeleteQuestionBankResponse = response as TDeleteQuestionBankResponse;
    yield put(deleteQuestionBankAction.success(deleteQuestionBankResponse));
    successCallback?.(deleteQuestionBankResponse);
  } catch (err) {
    yield put(deleteQuestionBankAction.failure(err));
    failedCallback?.(err);
  }
}
