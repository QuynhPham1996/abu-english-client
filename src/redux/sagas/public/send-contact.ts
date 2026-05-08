import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { sendContactAction } from '@/redux/actions';
import { sendContact, TSendContactResponse } from '@/services/api';

// FUNCTION

export function* sendContactSaga(action: ActionType<typeof sendContactAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(sendContact, materials);
    const sendContactResponse: TSendContactResponse = response as TSendContactResponse;
    yield put(sendContactAction.success(sendContactResponse));
    successCallback?.(sendContactResponse);
  } catch (err) {
    yield put(sendContactAction.failure(err));
    failedCallback?.(err);
  }
}
