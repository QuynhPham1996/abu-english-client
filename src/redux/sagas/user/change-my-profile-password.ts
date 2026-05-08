import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { changeMyProfilePasswordAction } from '@/redux/actions';
import { changeMyProfilePassword, TChangeMyProfilePasswordResponse } from '@/services/api';

// FUNCTION

export function* changeMyProfilePasswordSaga(
  action: ActionType<typeof changeMyProfilePasswordAction.request>,
): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(changeMyProfilePassword, materials);
    const changeMyProfilePasswordResponse: TChangeMyProfilePasswordResponse =
      response as TChangeMyProfilePasswordResponse;
    yield put(changeMyProfilePasswordAction.success(changeMyProfilePasswordResponse));
    successCallback?.(changeMyProfilePasswordResponse);
  } catch (err) {
    yield put(changeMyProfilePasswordAction.failure(err));
    failedCallback?.(err);
  }
}
