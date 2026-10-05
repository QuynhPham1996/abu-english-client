import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getQuestionBankAction } from '@/redux/actions';
import { getQuestionBank, TGetQuestionBankResponse } from '@/services/api';

// FUNCTION

export function* getQuestionBankSaga(action: ActionType<typeof getQuestionBankAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getQuestionBank, materials);
    const getQuestionBankResponse: TGetQuestionBankResponse = response as TGetQuestionBankResponse;
    yield put(getQuestionBankAction.success(getQuestionBankResponse));
    successCallback?.(getQuestionBankResponse);
  } catch (err) {
    yield put(getQuestionBankAction.failure(err));
    failedCallback?.(err);
  }
}
