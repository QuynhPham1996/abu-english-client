import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getQuestionBankItemAction } from '@/redux/actions';
import { getQuestionBankItem, TGetQuestionBankItemResponse } from '@/services/api';

// FUNCTION

export function* getQuestionBankItemSaga(action: ActionType<typeof getQuestionBankItemAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getQuestionBankItem, materials);
    const getQuestionBankItemResponse: TGetQuestionBankItemResponse = response as TGetQuestionBankItemResponse;
    yield put(getQuestionBankItemAction.success(getQuestionBankItemResponse));
    successCallback?.(getQuestionBankItemResponse);
  } catch (err) {
    yield put(getQuestionBankItemAction.failure(err));
    failedCallback?.(err);
  }
}
