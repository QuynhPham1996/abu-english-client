import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updateMyProfileAction } from '@/redux/actions';
import { updateMyProfile, TUpdateMyProfileResponse } from '@/services/api';

// FUNCTION

export function* updateMyProfileSaga(action: ActionType<typeof updateMyProfileAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updateMyProfile, materials);
    const updateMyProfileResponse: TUpdateMyProfileResponse = response as TUpdateMyProfileResponse;
    yield put(updateMyProfileAction.success(updateMyProfileResponse));
    successCallback?.(updateMyProfileResponse);
  } catch (err) {
    yield put(updateMyProfileAction.failure(err));
    failedCallback?.(err);
  }
}
