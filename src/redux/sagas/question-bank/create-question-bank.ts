import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { createQuestionBankAction } from '@/redux/actions';
import { createQuestionBank, TCreateQuestionBankResponse } from '@/services/api';

// FUNCTION

export function* createQuestionBankSaga(action: ActionType<typeof createQuestionBankAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(createQuestionBank, materials);
    const createQuestionBankResponse: TCreateQuestionBankResponse = response as TCreateQuestionBankResponse;
    yield put(createQuestionBankAction.success(createQuestionBankResponse));
    successCallback?.(createQuestionBankResponse);
  } catch (err) {
    yield put(createQuestionBankAction.failure(err));
    failedCallback?.(err);
  }
}
